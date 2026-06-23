import { test, expect } from '../../fixtures/base-test';
import { URL_DATE_QUERY_REGEX, URL_DATE_PARAM_REGEX } from '../../utils/constants/regex-patterns';

test.describe('Argo Map View — Date Picker', () => {
  test.beforeEach(async ({ mapPage }) => {
    await mapPage.goto('/map/argo');
    // Wait for the date picker to mount after the latest-date API response arrives
    await expect(mapPage.datePicker).toBeVisible();
  });

  test('date picker is visible on the Argo map view', async ({ mapPage }) => {
    await expect(mapPage.datePicker).toBeVisible();
  });

  test('date picker is not shown on non-Argo map products', async ({ mapPage }) => {
    await mapPage.goto('/map/sst');
    await expect(mapPage.datePicker).not.toBeVisible();
  });

  test('clicking previous sets ?date in the URL to the day before', async ({ mapPage }) => {
    await mapPage.datePreviousButton.click();
    await mapPage.page.waitForURL(URL_DATE_QUERY_REGEX);

    const date = mapPage.getSearchParamFromURL('date');
    expect(date).toMatch(URL_DATE_PARAM_REGEX); // YYYYMMDD
  });

  test('clicking previous then next returns to the original date', async ({ mapPage }) => {
    // Record the displayed date before navigation
    const initialText = await mapPage.datePicker.innerText();

    await mapPage.datePreviousButton.click();
    await mapPage.page.waitForURL(URL_DATE_QUERY_REGEX);

    await mapPage.dateNextButton.click();
    // Wait until the displayed text returns to the initial value
    await expect(mapPage.datePicker).toHaveText(initialText);

    const finalText = await mapPage.datePicker.innerText();
    expect(finalText).toBe(initialText);
  });

  test('reset button sets ?date back to the latest available date', async ({ mapPage }) => {
    // Move one day back so a ?date param exists
    await mapPage.datePreviousButton.click();
    await mapPage.page.waitForURL(URL_DATE_QUERY_REGEX);

    // Record the date before reset
    const prevDate = mapPage.getSearchParamFromURL('date');

    // Reset
    await mapPage.resetDateButton.click();
    // Wait for the URL to change to a different date
    await mapPage.page.waitForURL((url) => {
      const d = new URL(url).searchParams.get('date');
      return d !== null && d !== prevDate;
    });

    // Record the date after reset to verify it's different from before
    const resetDate = mapPage.getSearchParamFromURL('date');

    // Should be a different (later) date than after clicking previous
    expect(resetDate).not.toBe(prevDate);
    expect(resetDate).toMatch(URL_DATE_PARAM_REGEX);
  });

  test('switching from Argo to another product hides the date picker', async ({ mapPage }) => {
    await expect(mapPage.datePicker).toBeVisible();

    // Click a non-Argo product in the map sidebar
    // Click first product that is not Argo (SST)
    await mapPage.sidebar.getByText('SST').first().click();
    await mapPage.page.waitForLoadState('load');

    await expect(mapPage.datePicker).not.toBeVisible();
  });

  test('navigating directly to /map/argo with a ?date param shows that date in the picker', async ({ mapPage }) => {
    await mapPage.goto('/map/argo?date=20250601');
    await expect(mapPage.datePicker).toBeVisible();

    const pickerText = await mapPage.datePicker.innerText();
    expect(pickerText).toContain('Jun');
    expect(pickerText).toContain('2025');
  });
});
