import { test, expect } from '../fixtures/base-test';
import { NAVBAR_VIEWPORTS } from '../utils/constants/viewport-configs';

test.describe('Navbar Responsive Layout', () => {
  for (const { name, width, height } of NAVBAR_VIEWPORTS) {
    test(`Branding section does not overlap nav items at ${name} (${width}px)`, async ({ homePage }) => {
      await homePage.page.setViewportSize({ width, height });
      await homePage.load();

      const brandingSection = homePage.navbar.brandingSection;
      const mapsItem = homePage.navbar.mapsMenu;

      const brandingBox = await brandingSection.boundingBox();
      const mapsBox = await mapsItem.boundingBox();

      expect(brandingBox).not.toBeNull();
      expect(mapsBox).not.toBeNull();

      const brandingRight = brandingBox!.x + brandingBox!.width;
      const brandingBottom = brandingBox!.y + brandingBox!.height;
      const mapsRight = mapsBox!.x + mapsBox!.width;
      const mapsBottom = mapsBox!.y + mapsBox!.height;
      const horizontallySeparated = brandingRight <= mapsBox!.x || mapsRight <= brandingBox!.x;
      const verticallySeparated = brandingBottom <= mapsBox!.y || mapsBottom <= brandingBox!.y;
      expect(horizontallySeparated || verticallySeparated).toBeTruthy();
    });
  }
});
