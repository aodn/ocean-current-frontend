import { test, expect } from '../../fixtures/base-test';

// Surface Waves intentionally lands without a `date` param (see PRODUCT_LANDING's
// `resetDate` in src/configs/products/landing.ts) — the destination resolves its own
// latest date rather than carrying over whatever date the previous product had.
//
// This used to race: the date store (which drives the rendered image) only updated once
// the resolved date round-tripped back into the URL, so landing here via a client-side
// transition — from either the navbar or the LHS product dropdown — could briefly (or
// persistently) show a false "not available" error using the *previous* product's stale
// date, even though the date picker already displayed the correct resolved date.
//
// Both cases below start on Tidal Currents with a real date already in the URL (its own
// /product landing, per PRODUCT_LANDING.tidalCurrents), to reproduce that transition.
test.describe('Surface Waves Landing — no stale-date error on transition (#522)', () => {
  test.beforeEach(async ({ mockApi }) => {
    await mockApi.useSurfaceWavesMocks();
  });

  test('Navbar: switching from Tidal Currents to Surface Waves resolves its own latest date, no stale error', async ({
    productPage,
  }) => {
    await productPage.goto('/product/tidal-currents/speed?region=Aust&date=20260603');

    await productPage.navbar.clickMenuItem('maps', 'Surface Waves');

    await expect(productPage.page).toHaveURL(/\/product\/surface-waves\/wave/);
    expect(productPage.getSearchParamFromURL('region')).toBe('Au');

    const dateParam = await productPage.getDateParam();
    expect(dateParam).not.toBeNull();

    await expect(productPage.productNotAvailableError).not.toBeVisible();
  });

  test('LHS dropdown: switching from Tidal Currents to Surface Waves resolves its own latest date, stays under /product, no stale error', async ({
    productPage,
  }) => {
    await productPage.goto('/product/tidal-currents/speed?region=Aust&date=20260603');

    await productPage.switchProductViaDropdown('Surface Waves');

    await expect(productPage.page).toHaveURL(/\/product\/surface-waves\/wave/);
    expect(productPage.getSearchParamFromURL('region')).toBe('Au');

    const dateParam = await productPage.getDateParam();
    expect(dateParam).not.toBeNull();

    await expect(productPage.productNotAvailableError).not.toBeVisible();
  });
});
