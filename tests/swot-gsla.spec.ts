import { test, expect, type Request, type Page } from '@playwright/test';

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

const DATE_LABEL_RE = /\d{2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}/; // DD MMM YYYY HH:mm

test.describe('SWOT GSLA', () => {
  test('SSH Au: image + Argo tags load, date controls + label present', async ({ page }) => {
    const sshHits = trackRequests(page, /DR_SWOT\/SSH\/Au\/\d{14}\.gif/);
    const tagHits = trackRequests(page, /DR_SWOT\/TAGS\/Au\/\d{14}\.txt/);

    await page.goto('/product/swot-gsla/ssh?region=Au');
    // Wait for the date-resolution mechanism to write the real SWOT date to the URL.
    // Without this, the page briefly shows "today is not available" while the date list loads.
    await page.waitForURL(/[?&]date=\d{14}/, { timeout: 20000 });

    // URL resolved to a 14-digit date
    const date = new URL(page.url()).searchParams.get('date');
    expect(date, 'date param present').not.toBeNull();
    expect(date!).toMatch(/^\d{14}$/);

    // No error page
    await expect(page.locator('text=is not available for this product')).not.toBeVisible();

    // Date controls present (SSH is date-navigable)
    await expect(page.locator('[data-testid="date-next-button"]')).toBeVisible();
    await expect(page.locator('[aria-label="Reset to latest date"]')).toBeVisible();

    // Display label DD MMM YYYY HH:mm (seconds dropped)
    await expect(page.locator('body')).toContainText(DATE_LABEL_RE);

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

  test('SSH prev/next steps the date', async ({ page }) => {
    await page.goto('/product/swot-gsla/ssh?region=Au');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    const before = new URL(page.url()).searchParams.get('date');
    await page.locator('[data-testid="date-previous-button"]').click();
    await page.waitForTimeout(2000);
    const after = new URL(page.url()).searchParams.get('date');

    expect(before).not.toBeNull();
    expect(after).not.toBeNull();
    expect(after).not.toBe(before);
    expect(Number(after)).toBeLessThan(Number(before));
  });

  test('SSH Tas (local region): image loads from DR_SWOT/SSH/Tas', async ({ page }) => {
    const sshHits = trackRequests(page, /DR_SWOT\/SSH\/Tas\/\d{14}\.gif/);

    await page.goto('/product/swot-gsla/ssh?region=Tas');
    await page.waitForURL(/[?&]date=\d{14}/, { timeout: 20000 });

    await expect(page.locator('text=is not available for this product')).not.toBeVisible();
    await expect.poll(() => sshHits.length, { timeout: 10000 }).toBeGreaterThan(0);
    expect(
      sshHits.every((h) => h.status === 200),
      'Tas SSH images 200',
    ).toBeTruthy();
  });

  test('MDT Au: single image, no date controls, no Argo', async ({ page }) => {
    const mdtHits = trackRequests(page, /DR_SWOT\/MDTCMEMS\/Au\/Au\.gif/);
    const tagHits = trackRequests(page, /DR_SWOT\/TAGS\//);

    await page.goto('/product/swot-gsla/mdt?region=Au');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(4000);

    // Date controls hidden for MDT
    await expect(page.locator('[data-testid="date-next-button"]')).toHaveCount(0);
    await expect(page.locator('[data-testid="date-pagination"]')).toHaveCount(0);
    await expect(page.locator('[aria-label="Reset to latest date"]')).toHaveCount(0);

    await expect.poll(() => mdtHits.length, { timeout: 10000 }).toBeGreaterThan(0);
    expect(
      mdtHits.every((h) => h.status === 200),
      'MDT image 200',
    ).toBeTruthy();
    expect(tagHits.length, 'no Argo tags for MDT').toBe(0);
  });

  test('MDT Tas (local region): image loads from DR_SWOT/MDTCMEMS/Tas', async ({ page }) => {
    const mdtHits = trackRequests(page, /DR_SWOT\/MDTCMEMS\/Tas\/Tas\.gif/);

    await page.goto('/product/swot-gsla/mdt?region=Tas');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(4000);

    await expect.poll(() => mdtHits.length, { timeout: 10000 }).toBeGreaterThan(0);
    expect(
      mdtHits.every((h) => h.status === 200),
      'MDT Tas image 200',
    ).toBeTruthy();
  });

  test('DAY → SSH transition: 8-digit date snaps to first file of day, no 404 page', async ({ page }) => {
    const sshHits = trackRequests(page, /DR_SWOT\/SSH\/Au\/\d{14}\.gif/);

    await page.goto('/product/swot-gsla/ssh?region=Au&date=20250220');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(4000);

    await expect(page.locator('text=is not available for this product')).not.toBeVisible();

    const date = new URL(page.url()).searchParams.get('date');
    expect(date, 'resolved to a real 14-digit file').toMatch(/^\d{14}$/);
    await expect.poll(() => sshHits.length, { timeout: 10000 }).toBeGreaterThan(0);
    expect(
      sshHits.every((h) => h.status === 200),
      'transition image 200',
    ).toBeTruthy();
  });
});
