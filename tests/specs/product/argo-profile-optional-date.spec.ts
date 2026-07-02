import { test, expect } from '../../fixtures/base-test';
import { URL_DATE_PARAM_REGEX } from '../../utils/constants/regex-patterns';

/**
 * Argo profile URLs accept an optional `date` param. When only `wmoid` + `cycle` are present, the
 * app resolves the date from the fetched profiles, writes it back to the URL, and renders the
 * matching profile image (`…/profiles/{wmoid}/{date}_{wmoid}_{cycle}.gif`).
 *
 * Runs against live data, so assertions use patterns (not hardcoded dates). `5905578` is a reported
 * float; cycles 1 and 2 are its earliest profiles and are stable over time.
 */
test.describe('Argo Profile — optional date in URL', () => {
  const WMO_ID = '5905578';

  test('resolves the date from the cycle, writes it to the URL, and shows the matching image', async ({
    productPage,
  }) => {
    await productPage.goto(`/product/argo?wmoid=${WMO_ID}&cycle=1&depth=0-2000m`);

    const date = await productPage.getResolvedDate();

    // The rendered profile image must match the resolved date + the requested cycle.
    await expect(productPage.productImage).toHaveAttribute('src', new RegExp(`${date}_${WMO_ID}_1\\.gif`));

    // No "not available" error state.
    await expect(productPage.getByText('is not available for this product and/or region')).not.toBeVisible();
  });

  test('changing only the cycle resolves to a different date', async ({ productPage }) => {
    await productPage.goto(`/product/argo?wmoid=${WMO_ID}&cycle=1&depth=0-2000m`);
    const dateForCycle1 = await productPage.getResolvedDate();

    await productPage.goto(`/product/argo?wmoid=${WMO_ID}&cycle=2&depth=0-2000m`);
    await productPage.page.waitForURL(
      (url) => {
        const d = new URL(url).searchParams.get('date');
        return d !== null && URL_DATE_PARAM_REGEX.test(d) && d !== dateForCycle1;
      },
      { timeout: 15000 },
    );

    const dateForCycle2 = productPage.getSearchParamFromURL('date');
    expect(dateForCycle2).toMatch(URL_DATE_PARAM_REGEX);
    expect(dateForCycle2).not.toBe(dateForCycle1);

    await expect(productPage.productImage).toHaveAttribute('src', new RegExp(`${dateForCycle2}_${WMO_ID}_2\\.gif`));
  });

  test('an explicit date in the URL is preserved (date wins over cycle)', async ({ productPage }) => {
    // First resolve the canonical date for cycle 1.
    await productPage.goto(`/product/argo?wmoid=${WMO_ID}&cycle=1&depth=0-2000m`);
    const date = await productPage.getResolvedDate();

    // Navigate with the full URL — the date must be kept as-is.
    await productPage.goto(`/product/argo?wmoid=${WMO_ID}&cycle=1&depth=0-2000m&date=${date}`);

    // Wait on the deterministic render condition instead of a fixed sleep.
    await expect(productPage.productImage).toHaveAttribute('src', new RegExp(`${date}_${WMO_ID}_1\\.gif`));
    // Explicit date must be preserved (date wins over cycle).
    expect(productPage.getSearchParamFromURL('date')).toBe(date);
  });
});
