import { test, expect } from '@playwright/test';

/**
 * The Seal-CTD product description modal has two "here" links that deep-link
 * into the News page. They guard two separate things:
 *
 *   1. The links must use the current origin (root-relative `/news?...`), not a
 *      hardcoded domain, so they work on edge/beta/local. See
 *      ProductDescriptionData.tsx -> SealCtdModalData.
 *   2. The hash in each link must match an existing News section anchor — if a
 *      news article title (and therefore its `id`) changes, the deep link
 *      silently stops scrolling. These tests fail loudly when that happens.
 */

const SEAL_CTD_PRODUCT_URL = '/product/seal-ctd/tracks?region=POLAR&date=20240522';

const READ_MORE_LINKS = [
  {
    label: 'Seal-CTD product overview',
    filter: 'older_than_2020',
    anchor: 'SealCTDs_Temperature_and_Salinity_Profiles_from_Ocean_Mammals',
  },
  {
    label: 'Kerguelen Plateau article',
    filter: '2020-2023',
    anchor: 'Profiling_the_waters_around_the_Kerguelen_Plateau_hard_working_seals_and_drifting_Argo_floats',
  },
] as const;

test.describe('Seal-CTD modal "read more" links', () => {
  test('links open the description modal and point at the current origin', async ({ page }) => {
    await page.goto(SEAL_CTD_PRODUCT_URL);

    // Open the product description modal from the sidebar summary.
    const readMore = page.getByText('Read more', { exact: true });
    await expect(readMore).toBeVisible();
    await readMore.click();

    const origin = new URL(page.url()).origin;

    for (const { label, filter, anchor } of READ_MORE_LINKS) {
      const link = page.locator(`a[href*="${anchor}"]`);
      await expect(link, `${label}: link is rendered in the modal`).toBeVisible();

      // Raw attribute must stay root-relative (no hardcoded domain).
      await expect(link, `${label}: href is root-relative`).toHaveAttribute('href', `/news?filter=${filter}#${anchor}`);

      // Resolved URL must therefore live on the current origin, whatever it is.
      const resolvedHref = await link.evaluate((el) => (el as HTMLAnchorElement).href);
      expect(resolvedHref, `${label}: resolves against current origin`).toBe(
        `${origin}/news?filter=${filter}#${anchor}`,
      );

      // Opens in a new tab safely.
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
  });

  for (const { label, filter, anchor } of READ_MORE_LINKS) {
    test(`news deep link resolves to a visible anchor — ${label}`, async ({ page }) => {
      await page.goto(`/news?filter=${filter}#${anchor}`);

      // The target section anchor must still exist (catches title/id changes)
      // and the matching filter must reveal it, scrolled into view.
      const target = page.locator(`#${anchor}`);
      await expect(target, `anchor #${anchor} exists on the news page`).toBeAttached();
      await expect(target, `anchor #${anchor} is shown by filter "${filter}"`).toBeInViewport();
    });
  }
});
