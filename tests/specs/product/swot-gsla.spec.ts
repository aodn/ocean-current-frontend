import { test, expect } from '../../fixtures/base-test';
import { PRODUCT_FILE_REGEX } from '../../utils/constants/regex-patterns';

test.describe('SWOT GSLA', () => {
  test('SSH Au: image + Argo tags load, date controls + label present', async ({ productPage }) => {
    const sshHits = productPage.trackRequests(/DR_SWOT\/SSH\/Au\/20260426041646\.gif/);
    const tagHits = productPage.trackRequests(/DR_SWOT\/TAGS\/Au\/20260426041646\.txt/);

    await productPage.goto('/product/swot-gsla/ssh?region=Au&date=20260426041646');
    await productPage.page.waitForTimeout(4000);

    // No error page
    await expect(productPage.productNotAvailableError).not.toBeVisible();

    // Date controls present (SSH is date-navigable)
    await expect(productPage.dateNextButton).toBeVisible();
    await expect(productPage.resetDateButton).toBeVisible();

    // Display label for 26 Apr 2026 04:16 (seconds dropped in SECOND-format display)
    await productPage.expectContainsText('26 Apr 2026 04:16');

    // Real SSH image and Argo tags requested and 200
    await expect.poll(() => sshHits.length, { timeout: 10000 }).toBeGreaterThan(0);
    expect(
      sshHits.every((h) => h.status === 200),
      'SSH images 200',
    ).toBeTruthy();
    await expect.poll(() => tagHits.length, { timeout: 10000 }).toBeGreaterThan(0);
    expect(
      tagHits.every((h) => h.status === 200),
      'Argo tags 200',
    ).toBeTruthy();
  });

  test('SSH prev/next steps the date', async ({ productPage }) => {
    await productPage.goto('/product/swot-gsla/ssh?region=Au');
    await productPage.page.waitForTimeout(3000);

    const before = productPage.getSearchParamFromURL('date');
    await productPage.datePreviousButton.click();
    await productPage.page.waitForTimeout(2000);
    const after = productPage.getSearchParamFromURL('date');

    expect(before).not.toBeNull();
    expect(after).not.toBeNull();
    expect(after).not.toBe(before);
    expect(Number(after)).toBeLessThan(Number(before));
  });

  test('SSH Tas (local region): image loads from DR_SWOT/SSH/Tas', async ({ productPage }) => {
    const sshHits = productPage.trackRequests(/DR_SWOT\/SSH\/Tas\/20260426055940\.gif/);

    await productPage.goto('/product/swot-gsla/ssh?region=Tas&date=20260426055940');
    await productPage.page.waitForTimeout(4000);

    await expect(productPage.productNotAvailableError).not.toBeVisible();
    await expect.poll(() => sshHits.length, { timeout: 10000 }).toBeGreaterThan(0);
    expect(
      sshHits.every((h) => h.status === 200),
      'Tas SSH images 200',
    ).toBeTruthy();
  });

  test('MDT Au: single image, no date controls, no Argo', async ({ productPage }) => {
    const mdtHits = productPage.trackRequests(/DR_SWOT\/MDTCMEMS\/Au\/Au\.gif/);
    const tagHits = productPage.trackRequests(/DR_SWOT\/TAGS\//);

    await productPage.goto('/product/swot-gsla/mdt?region=Au');
    await productPage.page.waitForTimeout(4000);

    // Date controls hidden for MDT
    await expect(productPage.dateNextButton).toHaveCount(0);
    await expect(productPage.datePicker).toHaveCount(0);
    await expect(productPage.resetDateButton).toHaveCount(0);

    await expect.poll(() => mdtHits.length, { timeout: 10000 }).toBeGreaterThan(0);
    expect(
      mdtHits.every((h) => h.status === 200),
      'MDT image 200',
    ).toBeTruthy();
    expect(tagHits.length, 'no Argo tags for MDT').toBe(0);
  });

  test('MDT Tas (local region): image loads from DR_SWOT/MDTCMEMS/Tas', async ({ productPage }) => {
    const mdtHits = productPage.trackRequests(/DR_SWOT\/MDTCMEMS\/Tas\/Tas\.gif/);

    await productPage.goto('/product/swot-gsla/mdt?region=Tas');
    await productPage.page.waitForTimeout(4000);

    await expect.poll(() => mdtHits.length, { timeout: 10000 }).toBeGreaterThan(0);
    expect(
      mdtHits.every((h) => h.status === 200),
      'MDT Tas image 200',
    ).toBeTruthy();
  });

  test('DAY → SSH transition: 8-digit date snaps to first file of day, no 404 page', async ({ productPage }) => {
    const sshHits = productPage.trackRequests(/DR_SWOT\/SSH\/Au\/\d{14}\.gif/);

    await productPage.goto('/product/swot-gsla/ssh?region=Au&date=20250220');
    await productPage.page.waitForTimeout(4000);

    await expect(productPage.productNotAvailableError).not.toBeVisible();

    const date = productPage.getSearchParamFromURL('date');
    expect(date, 'resolved to a real 14-digit file').toMatch(PRODUCT_FILE_REGEX);
    await expect.poll(() => sshHits.length, { timeout: 10000 }).toBeGreaterThan(0);
    expect(
      sshHits.every((h) => h.status === 200),
      'transition image 200',
    ).toBeTruthy();
  });
});
