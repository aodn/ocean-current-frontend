import { test, expect } from '../../fixtures/base-test';

test.describe('Adjusted Sea Level Anomaly — Non-Tidal SLA', () => {
  test('Au: image + Argo tags load, date controls + label present', async ({ productPage }) => {
    // Image uses HOUR format (10-digit); tag file uses DAY format (8-digit).
    // This test guards against the regression where exact-equality date matching
    // permanently blocked Argo tags when tagDateFormat is coarser than imageFormat.
    const imageHits = productPage.trackRequests(/STATE_daily\/NTSLA\/Au\/2026051106\.gif/);
    const tagHits = productPage.trackRequests(/STATE_daily\/TAGS\/Au\/20260511\.txt/);

    await productPage.goto('/product/adjusted-sea-level-anomaly/non-tidal-sla?region=Au&date=2026051106');

    // No error page
    await expect(productPage.productNotAvailableError).not.toBeVisible();

    // Date controls present
    await expect(productPage.dateNextButton).toBeVisible({ timeout: 10000 });
    await expect(productPage.resetDateButton).toBeVisible();

    // Display label for 11 May 2026 06:00
    await productPage.expectContainsText('11 May 2026 06:00');

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
