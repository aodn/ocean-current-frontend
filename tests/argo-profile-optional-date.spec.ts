import { test, expect } from '@playwright/test';

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

  /** Wait for the resolved `date` param to land in the URL and return it. */
  async function getResolvedDate(page: import('@playwright/test').Page): Promise<string> {
    await page.waitForURL(/[?&]date=\d{8}/, { timeout: 15000 });
    const date = new URL(page.url()).searchParams.get('date');
    expect(date).toMatch(/^\d{8}$/);
    return date as string;
  }

  test('resolves the date from the cycle, writes it to the URL, and shows the matching image', async ({ page }) => {
    await page.goto(`/product/argo?wmoid=${WMO_ID}&cycle=1&depth=0-2000m`);
    await page.waitForLoadState('networkidle');

    const date = await getResolvedDate(page);

    // The rendered profile image must match the resolved date + the requested cycle.
    await expect(page.locator('img[alt="product"]').first()).toHaveAttribute(
      'src',
      new RegExp(`${date}_${WMO_ID}_1\\.gif`),
    );

    // No "not available" error state.
    await expect(page.getByText('is not available for this product and/or region')).not.toBeVisible();
  });

  test('changing only the cycle resolves to a different date', async ({ page }) => {
    await page.goto(`/product/argo?wmoid=${WMO_ID}&cycle=1&depth=0-2000m`);
    await page.waitForLoadState('networkidle');
    const dateForCycle1 = await getResolvedDate(page);

    await page.goto(`/product/argo?wmoid=${WMO_ID}&cycle=2&depth=0-2000m`);
    await page.waitForLoadState('networkidle');
    await page.waitForURL(
      (url) => {
        const d = new URL(url).searchParams.get('date');
        return d !== null && /^\d{8}$/.test(d) && d !== dateForCycle1;
      },
      { timeout: 15000 },
    );

    const dateForCycle2 = new URL(page.url()).searchParams.get('date');
    expect(dateForCycle2).toMatch(/^\d{8}$/);
    expect(dateForCycle2).not.toBe(dateForCycle1);

    await expect(page.locator('img[alt="product"]').first()).toHaveAttribute(
      'src',
      new RegExp(`${dateForCycle2}_${WMO_ID}_2\\.gif`),
    );
  });

  test('an explicit date in the URL is preserved (date wins over cycle)', async ({ page }) => {
    // First resolve the canonical date for cycle 1.
    await page.goto(`/product/argo?wmoid=${WMO_ID}&cycle=1&depth=0-2000m`);
    await page.waitForLoadState('networkidle');
    const date = await getResolvedDate(page);

    // Navigate with the full URL — the date must be kept as-is.
    await page.goto(`/product/argo?wmoid=${WMO_ID}&cycle=1&depth=0-2000m&date=${date}`);
    await page.waitForLoadState('networkidle');

    // Wait on the deterministic render condition instead of a fixed sleep.
    await expect(page.locator('img[alt="product"]').first()).toHaveAttribute(
      'src',
      new RegExp(`${date}_${WMO_ID}_1\\.gif`),
    );
    // Explicit date must be preserved (date wins over cycle).
    expect(new URL(page.url()).searchParams.get('date')).toBe(date);
  });
});
