import { test, expect, type Request, type Page } from './fixtures';

type Hit = { url: string; status: number | null };

function trackRequests(page: Page, glob: RegExp) {
  const hits: Hit[] = [];
  page.on('requestfinished', async (req: Request) => {
    if (glob.test(req.url())) {
      const res = await req.response();
      hits.push({ url: req.url(), status: res ? res.status() : null });
    }
  });
  return hits;
}

test.describe('Adjusted Sea Level Anomaly — Non-Tidal SLA', () => {
  test('Au: image + Argo tags load, date controls + label present', async ({ page }) => {
    // Image uses HOUR format (10-digit); tag file uses DAY format (8-digit).
    // This test guards against the regression where exact-equality date matching
    // permanently blocked Argo tags when tagDateFormat is coarser than imageFormat.
    const imageHits = trackRequests(page, /STATE_daily\/NTSLA\/Au\/2026051106\.gif/);
    const tagHits = trackRequests(page, /STATE_daily\/TAGS\/Au\/20260511\.txt/);

    await page.goto('/product/adjusted-sea-level-anomaly/non-tidal-sla?region=Au&date=2026051106');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(4000);

    // No error page
    await expect(page.locator('text=is not available for this product')).not.toBeVisible();

    // Date controls present
    await expect(page.locator('[data-testid="date-next-button"]')).toBeVisible();
    await expect(page.locator('[aria-label="Reset to latest date"]')).toBeVisible();

    // Display label for 11 May 2026 06:00
    await expect(page.locator('body')).toContainText('11 May 2026 06:00');

    // Real image and Argo tags requested and 200
    await expect.poll(() => imageHits.length, { timeout: 10000 }).toBeGreaterThan(0);
    expect(
      imageHits.every((h) => h.status === 200),
      'Non-Tidal SLA images 200',
    ).toBeTruthy();
    await expect.poll(() => tagHits.length, { timeout: 10000 }).toBeGreaterThan(0);
    expect(
      tagHits.every((h) => h.status === 200),
      'Argo tags 200',
    ).toBeTruthy();
  });
});
