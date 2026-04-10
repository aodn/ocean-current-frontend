import { test, expect } from '@playwright/test';

test.describe('About Dataset Button (formerly Wide Popup)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/product/eac-mooring-array?region=Brisbane');
    await page.waitForLoadState('networkidle');
  });

  test('about button is visible in the sidebar', async ({ page }) => {
    const aboutButton = page.getByText('About EAC mooring array dataset');
    await expect(aboutButton).toBeVisible();
  });

  test('clicking about button navigates to the about page', async ({ page }) => {
    await page.getByText('About EAC mooring array dataset').click();
    await page.waitForLoadState('networkidle');

    // Should navigate to about page
    expect(page.url()).toContain('/about/eac-mooring-array');

    // About page content should be visible
    await expect(page.getByText('EAC Mooring Array (2012-2022)')).toBeVisible();
    await expect(page.getByText(/The East Australian Current \(EAC\) is the complex/)).toBeVisible();
  });
});
