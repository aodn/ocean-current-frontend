import { test, expect } from '../../fixtures/base-test';

test('opens the map of the current SLA variant from the minimap', async ({ page, productPage }) => {
  await page.setViewportSize({ width: 1280, height: 844 });
  await page.goto('/product/adjusted-sea-level-anomaly/sst?region=Au&date=20240315');

  const miniMap = page.getByRole('region', { name: 'Map', exact: true });
  await expect(miniMap).toBeVisible();
  await expect(productPage.fullProductMap).toHaveCount(1);
  await expect
    .poll(async () => {
      const [mapBounds, linkBounds] = await Promise.all([
        miniMap.boundingBox(),
        productPage.fullProductMap.boundingBox(),
      ]);
      if (!mapBounds || !linkBounds) return false;
      const topInset = linkBounds.y - mapBounds.y;
      const rightInset = mapBounds.x + mapBounds.width - linkBounds.x - linkBounds.width;
      return topInset >= 0 && topInset <= 16 && rightInset >= 0 && rightInset <= 16;
    })
    .toBe(true);

  await productPage.fullProductMap.click();
  await expect(page).toHaveURL('/map/adjusted-sea-level-anomaly/sst');
  await expect(productPage.fullProductMap).toHaveCount(0);
});

test('opens the dated Argo map from the product header on mobile', async ({ page, productPage }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/product/argo?wmoid=5905578&cycle=1&depth=0-2000m&date=20240422');

  await expect(productPage.fullProductMap).toHaveCount(1);
  await expect(productPage.fullProductMap).toHaveAttribute('href', '/map/argo?date=20240422');
  await productPage.fullProductMap.click();
  await expect(page).toHaveURL('/map/argo?date=20240422');
});
