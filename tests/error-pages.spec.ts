import { test, expect } from '@playwright/test';

test.describe('Error Pages', () => {
  test('shows "This page is missing" when navigating to an unknown path', async ({ page }) => {
    await page.goto('/this-path-does-not-exist');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('This page is missing')).toBeVisible();
    await expect(page.locator('nav').filter({ hasText: 'Maps' }).first()).toBeVisible();
  });

  test('shows "Product Not Available" when navigating to an unknown product', async ({ page }) => {
    await page.goto('/product/unknown-product-xyz/sst');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('Product Not Available')).toBeVisible();
    await expect(page.locator('nav').filter({ hasText: 'Maps' }).first()).toBeVisible();
  });
});
