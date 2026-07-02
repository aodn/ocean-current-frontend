import { test, expect } from '../../fixtures/base-test';

test.describe('About Dataset Button', () => {
  test.beforeEach(async ({ productPage }) => {
    await productPage.goto('/product/eac-mooring-array?region=Brisbane');
  });

  test('about button is visible in the sidebar', async ({ productPage }) => {
    const aboutButton = productPage.getByText('About EAC mooring array dataset');
    await expect(aboutButton).toBeVisible();
  });

  test('clicking about button opens the about page in a new tab', async ({ productPage, context }) => {
    const [newTab] = await Promise.all([
      context.waitForEvent('page'),
      productPage.getByText('About EAC mooring array dataset').click(),
    ]);

    await newTab.waitForLoadState('load');

    expect(newTab.url()).toContain('/about/eac-mooring-array');
    await expect(newTab.getByText('EAC Mooring Array (2012-2022)')).toBeVisible();
    await expect(newTab.getByText(/The East Australian Current \(EAC\) is the complex/)).toBeVisible();
  });
});
