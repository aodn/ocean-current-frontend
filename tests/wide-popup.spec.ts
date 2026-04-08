import { test, expect } from '@playwright/test';

test.describe('Wide Popup (About dataset)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the EAC Mooring Array product page with the required region
    await page.goto('/product/eac-mooring-array?region=Brisbane');
    await page.waitForLoadState('networkidle');
  });

  test('about button is visible in the sidebar', async ({ page }) => {
    const aboutButton = page.getByText('About EAC mooring array dataset');
    await expect(aboutButton).toBeVisible();
  });

  test('clicking about button opens the wide popup', async ({ page }) => {
    await page.getByText('About EAC mooring array dataset').click();

    // Popup title should be visible
    const popupTitle = page.getByText('EAC Mooring Array (2012-2022)');
    await expect(popupTitle).toBeVisible();

    // Close button should be visible
    const closeButton = page.getByAltText('Close');
    await expect(closeButton).toBeVisible();
  });

  test('wide popup contains the article content', async ({ page }) => {
    await page.getByText('About EAC mooring array dataset').click();

    // Check for key content paragraphs
    await expect(page.getByText(/The East Australian Current \(EAC\) is the complex/)).toBeVisible();

    // Check for the figure caption
    await expect(page.getByText(/Figure 1:.*Location of the EAC moorings/)).toBeVisible();
  });

  test('wide popup can be closed via close button', async ({ page }) => {
    await page.getByText('About EAC mooring array dataset').click();

    const popupTitle = page.getByText('EAC Mooring Array (2012-2022)');
    await expect(popupTitle).toBeVisible();

    // Click close button
    await page.getByAltText('Close').click();

    // Popup should be gone
    await expect(popupTitle).not.toBeVisible();
  });

  test('wide popup can be closed by clicking outside', async ({ page }) => {
    await page.getByText('About EAC mooring array dataset').click();

    const popupTitle = page.getByText('EAC Mooring Array (2012-2022)');
    await expect(popupTitle).toBeVisible();

    // Click the overlay area (top-left corner, outside the popup card)
    await page.mouse.click(10, 10);

    await expect(popupTitle).not.toBeVisible();
  });

  test('background is not scrollable when popup is open', async ({ page }) => {
    await page.getByText('About EAC mooring array dataset').click();

    const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(bodyOverflow).toBe('hidden');
  });

  test('background scroll is restored after popup is closed', async ({ page }) => {
    await page.getByText('About EAC mooring array dataset').click();
    await page.getByAltText('Close').click();

    const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(bodyOverflow).toBe('');
  });

  test('popup content is scrollable when content overflows', async ({ page }) => {
    await page.getByText('About EAC mooring array dataset').click();

    // The scrollable body container
    const scrollContainer = page.locator('.overflow-y-auto').first();
    await expect(scrollContainer).toBeVisible();

    const scrollHeight = await scrollContainer.evaluate((el) => el.scrollHeight);
    const clientHeight = await scrollContainer.evaluate((el) => el.clientHeight);

    // Content should overflow (scrollHeight > clientHeight)
    expect(scrollHeight).toBeGreaterThan(clientHeight);
  });
});
