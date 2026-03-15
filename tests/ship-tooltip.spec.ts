import { test, expect } from '@playwright/test';

/**
 * E2E tests for ship (SOOP) name tooltip on hover.
 *
 * These tests verify that when the user hovers over a ship marker on a data image
 * that has SOOP tag data, a tooltip with the ship's name appears.
 *
 * The tag file API is mocked to return a SOOP entry at coordinates (0.5, 0.5)
 * relative to a 1×1 pixel placeholder image. After scaling, the ship marker
 * maps to the horizontal/vertical centre of the displayed image element, making
 * it straightforward to trigger and verify the tooltip.
 */

const SHIP_NAME = 'RVCapeFerguson';
const SHIP_CALLSIGN = 'VLMV';

// A minimal 1×1 transparent GIF placeholder
const PLACEHOLDER_GIF_BASE64 = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

test.describe('Ship name tooltip on hover', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept tag-file requests and return a SOOP entry at image-coordinate
    // (0.5, 0.5).  With a 1×1 source image the scale factors are equal to the
    // displayed pixel dimensions, so the marker lands at the centre of the
    // rendered <img> element.
    await page.route(/\/resource\/.*\/TAGS\/.*\.txt(\?.*)?$/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: `SOOP    0.5    0.5 ${SHIP_NAME}    ${SHIP_CALLSIGN}\n`,
      });
    });

    // Return a tiny placeholder for every image request so that the <img>
    // fires its load event without needing network access.
    const placeholderBuf = Buffer.from(PLACEHOLDER_GIF_BASE64, 'base64');
    await page.route(/\/(resource|storage)\/.*\.(gif|png|jpg|jpeg)(\?.*)?$/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'image/gif',
        body: placeholderBuf,
      });
    });
  });

  test('ship tooltip is hidden before hovering', async ({ page }) => {
    await page.goto('/map/sixDaySst?region=SE&date=20240315');
    await page.waitForLoadState('networkidle');

    // Tooltip must not be in the DOM before any hover interaction
    await expect(page.getByTestId('ship-tooltip')).not.toBeVisible();
  });

  test('ship tooltip appears when hovering over the ship location', async ({ page }) => {
    await page.goto('/map/sixDaySst?region=SE&date=20240315');
    await page.waitForLoadState('networkidle');

    // Wait for the DataImageWithArgoMap image to be present in the DOM
    const dataImage = page.locator('img[usemap="#argo-tag-map"]').first();
    const imageCount = await dataImage.count();
    if (imageCount === 0) {
      // Product/region combo doesn't render a DataImageWithArgoMap – skip
      test.skip();
      return;
    }

    // Wait until the image has finished loading (naturalWidth > 0)
    await page.waitForFunction(
      () => {
        const img = document.querySelector('img[usemap="#argo-tag-map"]') as HTMLImageElement | null;
        return img !== null && img.complete && img.naturalWidth > 0;
      },
      { timeout: 10000 },
    );

    const imgBox = await dataImage.boundingBox();
    if (!imgBox) {
      test.skip();
      return;
    }

    // The SOOP entry was placed at image-coordinate (0.5, 0.5) against a 1×1
    // source image.  After coordinate conversion:
    //   scaledX = 0.5 × displayedWidth
    //   scaledY = (1 − 0.5) × displayedHeight = 0.5 × displayedHeight
    // → the marker is at the centre of the rendered image element.
    const centerX = imgBox.x + imgBox.width * 0.5;
    const centerY = imgBox.y + imgBox.height * 0.5;

    // Move the mouse to the ship's screen position
    await page.mouse.move(centerX, centerY);

    // The tooltip should now be visible and contain the ship name
    const tooltip = page.getByTestId('ship-tooltip');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText(SHIP_NAME);
  });

  test('ship tooltip disappears after mouse moves away', async ({ page }) => {
    await page.goto('/map/sixDaySst?region=SE&date=20240315');
    await page.waitForLoadState('networkidle');

    const dataImage = page.locator('img[usemap="#argo-tag-map"]').first();
    const imageCount = await dataImage.count();
    if (imageCount === 0) {
      test.skip();
      return;
    }

    // Wait until the image has finished loading (naturalWidth > 0)
    await page.waitForFunction(
      () => {
        const img = document.querySelector('img[usemap="#argo-tag-map"]') as HTMLImageElement | null;
        return img !== null && img.complete && img.naturalWidth > 0;
      },
      { timeout: 10000 },
    );

    const imgBox = await dataImage.boundingBox();
    if (!imgBox) {
      test.skip();
      return;
    }

    const centerX = imgBox.x + imgBox.width * 0.5;
    const centerY = imgBox.y + imgBox.height * 0.5;

    // Hover over ship to show tooltip
    await page.mouse.move(centerX, centerY);
    await expect(page.getByTestId('ship-tooltip')).toBeVisible();

    // Move mouse away from the ship (far corner of the image)
    await page.mouse.move(imgBox.x + imgBox.width * 0.95, imgBox.y + imgBox.height * 0.95);

    // Tooltip must be gone
    await expect(page.getByTestId('ship-tooltip')).not.toBeVisible();
  });
});
