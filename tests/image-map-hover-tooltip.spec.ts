import { test, expect } from '@playwright/test';
import { skipIfBackendUnreachable } from './helpers/backend';

// Set E2E_SMOKE=true (via test:e2e:production script) to run against real upstream APIs instead of mocks.
const USE_REAL_API = process.env.E2E_SMOKE === 'true';

const MOCK_TAG_BODY = [
  'Argo 571.57 71.45 5905612 5 csiro R5905612_005.nc',
  'Argo 320.14 210.88 5904663 12 csiro R5904663_012.nc',
  'Argo 680.32 390.11 5906001 3 imos R5906001_003.nc',
  'SOOP 477.26 430.93 RVInvestigator NRT',
  'SOOP 210.50 150.75 MV_Sycamore NRT',
  'SOOP 590.00 300.40 FV_PacificStar NRT',
].join('\n');

// Minimal mock image — visible blue placeholder used in Playwright UI mode
const MOCK_IMAGE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
  <rect width="800" height="600" fill="#2563eb"/>
  <text x="400" y="300" text-anchor="middle" dominant-baseline="middle"
        fill="white" font-family="sans-serif" font-size="48">Mock Image</text>
</svg>`;

test.describe('Data Image Map — Hover Tooltip (Issue #317)', () => {
  test.beforeEach(async ({ baseURL }) => skipIfBackendUnreachable(baseURL));

  test.beforeEach(async ({ page }) => {
    if (!USE_REAL_API) {
      // Must come before page.goto()
      await page.route('**/TAGS/**/*.txt', (route) => {
        return route.fulfill({
          status: 200,
          contentType: 'text/plain',
          body: MOCK_TAG_BODY,
        });
      });

      await page.route('**/*.gif', (route) => {
        return route.fulfill({
          status: 200,
          contentType: 'image/svg+xml',
          body: MOCK_IMAGE_SVG,
        });
      });
    }

    await page.goto('/product/six-day-sst/sst?region=SGBR&date=20251110');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('map[name="argo-tag-map"] area', { state: 'attached', timeout: 10000 });
  });

  test('TC-317-1: SOOP areas have ship name as data-tooltip attribute', async ({ page }) => {
    const soopAreas = page.locator('map[name="argo-tag-map"] area[data-tooltip="RVInvestigator"]');
    expect(await soopAreas.count()).toBeGreaterThan(0);
  });

  test('TC-317-2: Argo areas have dataSource filename as data-tooltip attribute', async ({ page }) => {
    const argoArea = page.locator('map[name="argo-tag-map"] area[data-tooltip="R5905612_005.nc"]');
    expect(await argoArea.count()).toBeGreaterThan(0);
  });

  test('TC-317-3: all areas use cursor-pointer', async ({ page }) => {
    const areas = page.locator('map[name="argo-tag-map"] area');
    const count = await areas.count();
    for (let i = 0; i < count; i++) {
      await expect(areas.nth(i)).toHaveClass(/cursor-pointer/);
    }
  });

  test('TC-317-4: hovering an Argo area shows the custom tooltip with dataSource text', async ({ page }) => {
    const argoArea = page.locator('map[name="argo-tag-map"] area[data-tooltip="R5905612_005.nc"]').first();
    const imgBox = await page.locator('img[usemap="#argo-tag-map"]').boundingBox();
    const coords = (await argoArea.getAttribute('coords'))!.split(',').map(Number);
    await page.mouse.move(imgBox!.x + coords[0], imgBox!.y + coords[1]);
    await expect(page.getByTestId('image-map-tooltip')).toBeVisible();
    await expect(page.getByTestId('image-map-tooltip')).toHaveText('R5905612_005.nc');
  });

  test('TC-317-5: hovering a SOOP area shows the custom tooltip with ship name', async ({ page }) => {
    const soopArea = page.locator('map[name="argo-tag-map"] area[data-tooltip="RVInvestigator"]').first();
    const imgBox = await page.locator('img[usemap="#argo-tag-map"]').boundingBox();
    const coords = (await soopArea.getAttribute('coords'))!.split(',').map(Number);
    await page.mouse.move(imgBox!.x + coords[0], imgBox!.y + coords[1]);
    await expect(page.getByTestId('image-map-tooltip')).toBeVisible();
    await expect(page.getByTestId('image-map-tooltip')).toHaveText('RVInvestigator');
  });
});
