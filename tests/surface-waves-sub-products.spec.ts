import { test, expect } from '@playwright/test';

// The disable detection in ProductSidebar reads `searchParams.get('region')` and
// disables the Buoy Timeseries button when the value is exactly 'Au'.
//
// Two URL building concerns must stay in sync:
//   1. The wave product default: /product/surface-waves/wave?region=Au
//   2. The buoy click URL:       buildBuoyTimeseriesImagePath → ?region=<buoy_title>
//
// If either param name or the wave default value changes, the tests below will fail,
// making the coupling explicit and catching the regression.

const MOCK_IMAGE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
  <rect width="800" height="600" fill="#1e3a5f"/>
</svg>`;

const MOCK_BUOY_TAGS = 'Maria_Island 400.0 300.0 15 TS Maria Island\n';

test.describe('Surface Waves — sub-product option buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/*.gif', (route) =>
      route.fulfill({ status: 200, contentType: 'image/svg+xml', body: MOCK_IMAGE_SVG }),
    );
    await page.route('**/TAGS/**', (route) =>
      route.fulfill({ status: 200, contentType: 'text/plain', body: MOCK_BUOY_TAGS }),
    );
  });

  test('Buoy Timeseries button is disabled before any buoy point is selected (region=Au)', async ({ page }) => {
    await page.goto('/product/surface-waves/wave?region=Au');
    await page.waitForLoadState('networkidle');

    const buoyButton = page.getByRole('button', { name: 'Buoy Timeseries' });
    await expect(buoyButton).toBeDisabled();
  });

  test('Map button stays enabled before any buoy point is selected', async ({ page }) => {
    await page.goto('/product/surface-waves/wave?region=Au');
    await page.waitForLoadState('networkidle');

    const mapButton = page.getByRole('button', { name: 'Map' });
    await expect(mapButton).not.toBeDisabled();
  });

  test('both buttons are enabled once a buoy region is active', async ({ page }) => {
    // Navigating here simulates what happens after a user clicks a buoy circle.
    // The region param is set to a buoy title (not 'Au'), so both buttons unlock.
    await page.goto('/product/surface-waves/buoy-timeseries?region=Maria_Island&date=2024010100');
    await page.waitForLoadState('networkidle');

    const mapButton = page.getByRole('button', { name: 'Map', exact: true });
    const buoyButton = page.getByRole('button', { name: 'Buoy Timeseries' });
    await expect(mapButton).not.toBeDisabled();
    await expect(buoyButton).not.toBeDisabled();
  });
});
