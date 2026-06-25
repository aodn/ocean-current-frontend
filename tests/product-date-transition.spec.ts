import { test, expect } from './fixtures';

test.describe('Product Date Transition — Nearest Date Search (#318)', () => {
  /**
   * Helper: wait for the page to fully load and the date param to stabilise.
   * Returns the final `date` search param value, or null if not present.
   */
  async function getDateParam(page: import('@playwright/test').Page): Promise<string | null> {
    // Give the app time to resolve the date and update the URL
    await page.waitForTimeout(3000);
    const url = new URL(page.url());
    return url.searchParams.get('date');
  }

  /**
   * Parse a date string of length 6 (YYYYMM), 8 (YYYYMMDD), or 10 (YYYYMMDDHH) into a Date.
   */
  function parseDateParam(dateStr: string): Date {
    const year = parseInt(dateStr.slice(0, 4));
    const month = parseInt(dateStr.slice(4, 6)) - 1;
    const day = dateStr.length >= 8 ? parseInt(dateStr.slice(6, 8)) : 1;
    return new Date(year, month, day);
  }

  test('TC-318-1: Switching from 6-day SST (DAY) to 4-hour SST (HOUR) resolves to a nearby date', async ({ page }) => {
    // Navigate directly to 4-hour SST with a DAY-format date (simulates product switch)
    // Use Au region (state level) which has broad 4h SST coverage
    await page.goto('/product/four-hour-sst/sst-filled?region=Au&date=20250220');
    await page.waitForLoadState('networkidle');

    const dateParam = await getDateParam(page);

    expect(dateParam).not.toBeNull();

    // The resolved date should be near Feb 20, 2025 (within ±20 days)
    const targetDate = new Date(2025, 1, 20); // Feb 20, 2025
    const actualDate = parseDateParam(dateParam!);
    const diffDays = Math.abs((actualDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));
    expect(diffDays).toBeLessThanOrEqual(20);
  });

  test('TC-318-2: Switching to ocean colour chl-a finds nearest date within ±5 days', async ({ page }) => {
    // Navigate to ocean colour chl-a with a date that may not exist
    // Using state-level (Au region) with DAY format
    await page.goto('/product/ocean-colour/chl-a?region=Au&date=20250220');
    await page.waitForLoadState('networkidle');

    const dateParam = await getDateParam(page);

    expect(dateParam).not.toBeNull();

    // The resolved date should be near Feb 20, 2025 (within ±5 days for chl-a)
    const targetDate = new Date(2025, 1, 20);
    const actualDate = parseDateParam(dateParam!);
    const diffDays = Math.abs((actualDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));
    expect(diffDays).toBeLessThanOrEqual(5);
  });

  test('TC-318-3: Switching between same-format products still finds nearest date', async ({ page }) => {
    // Navigate to 4h SST with a specific hourly date
    await page.goto('/product/four-hour-sst/sst-filled?region=Au&date=2025022012');
    await page.waitForLoadState('networkidle');

    const dateParam = await getDateParam(page);

    expect(dateParam).not.toBeNull();

    // Should be near Feb 20, 2025 (within ±20 days)
    const targetDate = new Date(2025, 1, 20);
    const actualDate = parseDateParam(dateParam!);
    const diffDays = Math.abs((actualDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));
    expect(diffDays).toBeLessThanOrEqual(20);
  });

  test('TC-318-4: Date is preserved when switching between sub-products', async ({ page }) => {
    // Start on 6-day SST with a specific date
    await page.goto('/product/six-day-sst/sst?region=Au&date=20250220');
    await page.waitForLoadState('networkidle');

    const initialDateParam = await getDateParam(page);
    expect(initialDateParam).not.toBeNull();

    // Switch to 6-day SST anomaly (same format, same dates available)
    await page.goto(`/product/six-day-sst/sst-anomaly?region=Au&date=${initialDateParam}`);
    await page.waitForLoadState('networkidle');

    const dateParam = await getDateParam(page);

    // Date should be preserved since both sub-products share the same date list
    expect(dateParam).toBe(initialDateParam);
  });

  test('TC-318-5: No error page shown after date transition', async ({ page }) => {
    // Navigate to 4h SST with a DAY-format date (product transition scenario)
    await page.goto('/product/four-hour-sst/sst-filled?region=Au&date=20250220');
    await page.waitForLoadState('networkidle');

    // Wait for date resolution and image loading
    await page.waitForTimeout(5000);

    // The "not available" error message should NOT be shown
    const errorMessage = page.locator('text=is not available for this product');
    await expect(errorMessage).not.toBeVisible();
  });

  test('TC-318-6: No React warnings about setState during render', async ({ page }) => {
    const consoleWarnings: string[] = [];
    page.on('console', (msg) => {
      if ((msg.type() === 'error' || msg.type() === 'warning') && msg.text().includes('Cannot update a component')) {
        consoleWarnings.push(msg.text());
      }
    });

    // Trigger a date format transition (DAY → HOUR)
    await page.goto('/product/four-hour-sst/sst-filled?region=Au&date=20250220');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Verify no "Cannot update a component while rendering" warnings
    const setStateDuringRenderWarnings = consoleWarnings.filter((w) => w.includes('Cannot update a component'));
    expect(setStateDuringRenderWarnings).toHaveLength(0);
  });
});
