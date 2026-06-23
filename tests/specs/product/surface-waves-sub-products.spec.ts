import { test, expect } from '../../fixtures/base-test';

// The disable detection in ProductSidebar reads `searchParams.get('region')` and
// disables the Buoy Timeseries button when the value is exactly 'Au'.
//
// Two URL building concerns must stay in sync:
//   1. The wave product default: /product/surface-waves/wave?region=Au
//   2. The buoy click URL:       buildBuoyTimeseriesImagePath → ?region=<buoy_title>
//
// If either param name or the wave default value changes, the tests below will fail,
// making the coupling explicit and catching the regression.

test.describe('Surface Waves — sub-product option buttons', () => {
  test.beforeEach(async ({ mockApi }) => {
    await mockApi.useSurfaceWavesMocks();
  });

  test('Buoy Timeseries button is disabled before any buoy point is selected (region=Au)', async ({ productPage }) => {
    await productPage.goto('/product/surface-waves/wave?region=Au');

    await expect(productPage.buoyTimeseriesButton).toBeDisabled();
  });

  test('Map button stays enabled before any buoy point is selected', async ({ productPage }) => {
    await productPage.goto('/product/surface-waves/wave?region=Au');

    await expect(productPage.mapButton).not.toBeDisabled();
  });

  test('Buoy Timeseries button is disabled when no region param is present', async ({ productPage }) => {
    // Arriving via redirect (e.g. /product/surface-waves → /product/surface-waves/wave)
    // does not append ?region=Au, so region is null — treated the same as Au.
    await productPage.goto('/product/surface-waves/wave');

    await expect(productPage.buoyTimeseriesButton).toBeDisabled();
  });

  test('both buttons are enabled once a buoy region is active', async ({ productPage }) => {
    // Navigating here simulates what happens after a user clicks a buoy circle.
    // The region param is set to a buoy title (not 'Au'), so both buttons unlock.
    await productPage.goto('/product/surface-waves/buoy-timeseries?region=Maria_Island&date=2024010100');

    await expect(productPage.mapButton).not.toBeDisabled();
    await expect(productPage.buoyTimeseriesButton).not.toBeDisabled();
  });
});
