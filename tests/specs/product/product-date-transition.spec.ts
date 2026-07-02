import { test, expect } from '../../fixtures/base-test';

test.describe('Product Date Transition — Nearest Date Search (#318)', () => {
  test('TC-318-1: Switching from 6-day SST (DAY) to 4-hour SST (HOUR) resolves to a nearby date', async ({
    productPage,
  }) => {
    // Navigate directly to 4-hour SST with a DAY-format date (simulates product switch)
    // Use Au region (state level) which has broad 4h SST coverage
    await productPage.goto('/product/four-hour-sst/sst-filled?region=Au&date=20250220');

    const dateParam = await productPage.getDateParam();

    expect(dateParam).not.toBeNull();

    // The resolved date should be near Feb 20, 2025 (within ±20 days)
    const targetDate = new Date(2025, 1, 20); // Feb 20, 2025
    const actualDate = productPage.parseDateParam(dateParam!);
    const diffDays = Math.abs((actualDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));
    expect(diffDays).toBeLessThanOrEqual(20);
  });

  test('TC-318-2: Switching to ocean colour chl-a finds nearest date within ±5 days', async ({ productPage }) => {
    // Navigate to ocean colour chl-a with a date that may not exist
    // Using state-level (Au region) with DAY format
    await productPage.goto('/product/ocean-colour/chl-a?region=Au&date=20250220');

    const dateParam = await productPage.getDateParam();

    expect(dateParam).not.toBeNull();

    // The resolved date should be near Feb 20, 2025 (within ±5 days for chl-a)
    const targetDate = new Date(2025, 1, 20);
    const actualDate = productPage.parseDateParam(dateParam!);
    const diffDays = Math.abs((actualDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));
    expect(diffDays).toBeLessThanOrEqual(5);
  });

  test('TC-318-3: Switching between same-format products still finds nearest date', async ({ productPage }) => {
    // Navigate to 4h SST with a specific hourly date
    await productPage.goto('/product/four-hour-sst/sst-filled?region=Au&date=2025022012');

    const dateParam = await productPage.getDateParam();

    expect(dateParam).not.toBeNull();

    // Should be near Feb 20, 2025 (within ±20 days)
    const targetDate = new Date(2025, 1, 20);
    const actualDate = productPage.parseDateParam(dateParam!);
    const diffDays = Math.abs((actualDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));
    expect(diffDays).toBeLessThanOrEqual(20);
  });

  test('TC-318-4: Date is preserved when switching between sub-products', async ({ productPage }) => {
    // Start on 6-day SST with a specific date
    await productPage.goto('/product/six-day-sst/sst?region=Au&date=20250220');

    const initialDateParam = await productPage.getDateParam();
    expect(initialDateParam).not.toBeNull();

    // Switch to 6-day SST anomaly (same format, same dates available)
    await productPage.goto(`/product/six-day-sst/sst-anomaly?region=Au&date=${initialDateParam}`);

    const dateParam = await productPage.getDateParam();

    // Date should be preserved since both sub-products share the same date list
    expect(dateParam).toBe(initialDateParam);
  });

  test('TC-318-5: No error page shown after date transition', async ({ productPage }) => {
    // Navigate to 4h SST with a DAY-format date (product transition scenario)
    await productPage.goto('/product/four-hour-sst/sst-filled?region=Au&date=20250220');

    // Wait for date resolution and image loading
    await productPage.page.waitForTimeout(5000);

    // The "not available" error message should NOT be shown
    await expect(productPage.productNotAvailableError).not.toBeVisible();
  });

  test('TC-318-6: No React warnings about setState during render', async ({ productPage }) => {
    const consoleWarnings: string[] = [];
    productPage.page.on('console', (msg) => {
      if ((msg.type() === 'error' || msg.type() === 'warning') && msg.text().includes('Cannot update a component')) {
        consoleWarnings.push(msg.text());
      }
    });

    // Trigger a date format transition (DAY → HOUR)
    await productPage.goto('/product/four-hour-sst/sst-filled?region=Au&date=20250220');
    await productPage.page.waitForTimeout(3000);

    // Verify no "Cannot update a component while rendering" warnings
    const setStateDuringRenderWarnings = consoleWarnings.filter((w) => w.includes('Cannot update a component'));
    expect(setStateDuringRenderWarnings).toHaveLength(0);
  });
});
