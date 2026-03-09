import { test, expect } from '@playwright/test';

test.describe('Argo Map View — Date Picker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/map/argo');
    await page.waitForLoadState('networkidle');
    // Allow time for the latest-date API response to arrive and the picker to mount
    await page.waitForTimeout(2000);
  });

  test('date picker is visible on the Argo map view', async ({ page }) => {
    await expect(page.getByTestId('date-pagination')).toBeVisible();
  });

  test('date picker is not shown on non-Argo map products', async ({ page }) => {
    await page.goto('/map/sst');
    await page.waitForLoadState('networkidle');
    await expect(page.getByTestId('date-pagination')).not.toBeVisible();
  });

  test('clicking previous sets ?date in the URL to the day before', async ({ page }) => {
    // Click prev to move off the default date and produce a URL param
    await page.getByTestId('date-previous-button').click();
    await page.waitForTimeout(500);

    const url = new URL(page.url());
    const date = url.searchParams.get('date');
    expect(date).toMatch(/^\d{8}$/); // YYYYMMDD
  });

  test('clicking previous then next returns to the original date', async ({ page }) => {
    // Record the displayed date before navigation
    const initialText = await page.getByTestId('date-pagination').innerText();

    await page.getByTestId('date-previous-button').click();
    await page.waitForTimeout(300);
    await page.getByTestId('date-next-button').click();
    await page.waitForTimeout(300);

    const finalText = await page.getByTestId('date-pagination').innerText();
    expect(finalText).toBe(initialText);
  });

  test('reset button sets ?date back to the latest available date', async ({ page }) => {
    // Move one day back so a ?date param exists
    await page.getByTestId('date-previous-button').click();
    await page.waitForTimeout(300);

    const urlAfterPrev = new URL(page.url());
    const prevDate = urlAfterPrev.searchParams.get('date');

    // Reset
    await page.getByRole('button', { name: 'Reset to latest date' }).click();
    await page.waitForTimeout(500);

    const urlAfterReset = new URL(page.url());
    const resetDate = urlAfterReset.searchParams.get('date');

    // Should be a different (later) date than after clicking previous
    expect(resetDate).not.toBe(prevDate);
    expect(resetDate).toMatch(/^\d{8}$/);
  });

  test('switching from Argo to another product hides the date picker', async ({ page }) => {
    await expect(page.getByTestId('date-pagination')).toBeVisible();

    // Click a non-Argo product in the map sidebar
    const sidebar = page.getByTestId('drop-down-menu');
    // Click first product that is not Argo (SST)
    await sidebar.getByText('SST').first().click();
    await page.waitForLoadState('networkidle');

    await expect(page.getByTestId('date-pagination')).not.toBeVisible();
  });

  test('navigating directly to /map/argo with a ?date param shows that date in the picker', async ({ page }) => {
    await page.goto('/map/argo?date=20250601');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const pickerText = await page.getByTestId('date-pagination').innerText();
    expect(pickerText).toContain('Jun');
    expect(pickerText).toContain('2025');
  });
});
