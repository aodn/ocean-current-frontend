import { test, expect } from './fixtures';

test.describe('About Dataset Button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/product/eac-mooring-array?region=Brisbane');
    await page.waitForLoadState('networkidle');
  });

  test('about button is visible in the sidebar', async ({ page }) => {
    const aboutButton = page.getByText('About EAC mooring array dataset');
    await expect(aboutButton).toBeVisible();
  });

  test('clicking about button opens the about page in a new tab', async ({ page, context }) => {
    const [newTab] = await Promise.all([
      context.waitForEvent('page'),
      page.getByText('About EAC mooring array dataset').click(),
    ]);

    await newTab.waitForLoadState('networkidle');

    expect(newTab.url()).toContain('/about/eac-mooring-array');
    await expect(newTab.getByText('EAC Mooring Array (2012-2022)')).toBeVisible();
    await expect(newTab.getByText(/The East Australian Current \(EAC\) is the complex/)).toBeVisible();
  });
});
