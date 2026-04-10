import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test('about button on product page opens about page in same tab', async ({ page }) => {
    await page.goto('/product/eac-mooring-array?region=Brisbane');
    await page.waitForLoadState('networkidle');

    const aboutButton = page.getByText('About EAC mooring array dataset');
    await expect(aboutButton).toBeVisible();

    // The button should be wrapped in a link to the about page
    const link = aboutButton.locator('xpath=ancestor::a');
    await expect(link).toHaveAttribute('href', '/about/eac-mooring-array');
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

  test('"Explore dataset" button links to product page with latest date', async ({ page }) => {
    await page.goto('/about/eac-mooring-array');
    await page.waitForLoadState('networkidle');

    const exploreButton = page.getByText('Explore dataset');
    await expect(exploreButton).toBeVisible();

    // Wait for the API to populate region and date in the link
    const link = exploreButton.locator('xpath=ancestor::a');
    await expect(link).toHaveAttribute('href', /region=.+&date=\d+/, { timeout: 10000 });

    const href = await link.getAttribute('href');
    expect(href).toContain('/product/eac-mooring-array');
  });

  test('"Explore dataset" button navigates to product page', async ({ page }) => {
    await page.goto('/about/eac-mooring-array');
    await page.waitForLoadState('networkidle');

    await page.getByText('Explore dataset').click();
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/product/eac-mooring-array');
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
