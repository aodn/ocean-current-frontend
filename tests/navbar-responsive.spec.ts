import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'tablet', width: 900, height: 800 },
  { name: 'lg', width: 1024, height: 800 },
  { name: 'xl', width: 1280, height: 800 },
];

test.describe('Navbar Responsive Layout', () => {
  for (const { name, width, height } of viewports) {
    test(`Branding section does not overlap nav items at ${name} (${width}px)`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const navbar = page.getByTestId('main-navbar');
      const brandingSection = navbar.locator('div').first();
      const mapsItem = navbar.getByText('Maps', { exact: true });

      const brandingBox = await brandingSection.boundingBox();
      const mapsBox = await mapsItem.boundingBox();

      expect(brandingBox).not.toBeNull();
      expect(mapsBox).not.toBeNull();

      const brandingRight = brandingBox!.x + brandingBox!.width;
      expect(brandingRight).toBeLessThan(mapsBox!.x);
    });
  }
});
