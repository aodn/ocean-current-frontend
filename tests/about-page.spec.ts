import { test, expect } from '@playwright/test';
import { skipIfBackendUnreachable } from './helpers/backend';

test.describe('About Page', () => {
  test.beforeEach(async ({ baseURL }) => skipIfBackendUnreachable(baseURL));

  test('about button on product page is visible and opens about page in a new tab', async ({ page, context }) => {
    await page.goto('/product/eac-mooring-array?region=Brisbane');
    await page.waitForLoadState('networkidle');

    const aboutButton = page.getByText('About EAC mooring array dataset');
    await expect(aboutButton).toBeVisible();

    const [newTab] = await Promise.all([context.waitForEvent('page'), aboutButton.click()]);

    await newTab.waitForLoadState('networkidle');
    expect(newTab.url()).toContain('/about/eac-mooring-array');
  });

  test('about page renders heading and content', async ({ page }) => {
    await page.goto('/about/eac-mooring-array');
    await page.waitForLoadState('networkidle');

    // Heading should be visible
    await expect(page.getByText('EAC Mooring Array (2012-2022)')).toBeVisible();

    // Key content should be visible
    await expect(page.getByText(/The East Australian Current \(EAC\) is the complex/)).toBeVisible();

    // Figure caption should be visible
    await expect(page.getByText(/Figure 1:.*Location of the EAC moorings/)).toBeVisible();
  });

  test('about page has navbar and footer', async ({ page }) => {
    await page.goto('/about/eac-mooring-array');
    await page.waitForLoadState('networkidle');

    // At least one navbar (mobile or desktop) should be present
    await expect(page.locator('nav').first()).toBeAttached();

    // Footer should be present
    await expect(page.locator('footer').first()).toBeAttached();
  });

  test('about page has no sidebar or menu bar', async ({ page }) => {
    await page.goto('/about/eac-mooring-array');
    await page.waitForLoadState('networkidle');

    // Product sidebar should not be present
    await expect(page.locator('[data-testid="product-sidebar"]')).not.toBeVisible();
  });

  test('"Explore dataset" button navigates to product page with latest date', async ({ page }) => {
    await page.goto('/about/eac-mooring-array');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('Explore dataset')).toBeVisible();

    await page.getByText('Explore dataset').click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/product/eac-mooring-array');
    // URL should include region and date from latest-dates API
    expect(page.url()).toMatch(/region=.+&date=\d+/);
  });

  test('about page shows error for product without about content', async ({ page }) => {
    await page.goto('/about/four-hour-sst/sst');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('About Content Not Available')).toBeVisible();
  });

  test('about page shows error for invalid product', async ({ page }) => {
    await page.goto('/about/nonexistent-product');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('About Content Not Available')).toBeVisible();
  });

  test('about page is directly accessible via URL (shareable)', async ({ page }) => {
    // Simulate landing on about page directly (no prior navigation)
    await page.goto('/about/eac-mooring-array');
    await page.waitForLoadState('networkidle');

    // Content should render without needing to come from product page
    await expect(page.getByText('EAC Mooring Array (2012-2022)')).toBeVisible();
    await expect(page.getByText('Explore dataset')).toBeVisible();
  });
});
