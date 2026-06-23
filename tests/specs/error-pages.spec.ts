import { test, expect } from '../fixtures/base-test';

test.describe('Error Pages', () => {
  test('shows "This page is missing" when navigating to an unknown path', async ({ homePage }) => {
    await homePage.goto('/this-path-does-not-exist');

    await expect(homePage.getByText('This page is missing')).toBeVisible();
    await homePage.navbar.expectVisible();
  });

  test('shows "Product Not Available" when navigating to an unknown product', async ({ homePage }) => {
    await homePage.goto('/product/unknown-product-xyz/sst');

    await expect(homePage.getByText('Product Not Available')).toBeVisible();
    await homePage.navbar.expectVisible();
  });
});
