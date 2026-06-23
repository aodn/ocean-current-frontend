import { test, expect } from '../../fixtures/base-test';

test.describe('About Page', () => {
  test('about button on product page is visible and opens about page in a new tab', async ({
    productPage,
    context,
  }) => {
    await productPage.goto('/product/eac-mooring-array?region=Brisbane');

    const aboutButton = productPage.getAboutDatasetButton('EAC mooring array');
    await expect(aboutButton).toBeVisible();

    const [newTab] = await Promise.all([context.waitForEvent('page'), aboutButton.click()]);

    await newTab.waitForLoadState('load');
    expect(newTab.url()).toContain('/about/eac-mooring-array');
  });

  test('about page renders heading and content', async ({ aboutPage }) => {
    await aboutPage.gotoEacMooringArray();

    // Heading should be visible
    await expect(aboutPage.getByText('EAC Mooring Array (2012-2022)')).toBeVisible();

    // Key content should be visible
    await expect(aboutPage.getByText(/The East Australian Current \(EAC\) is the complex/)).toBeVisible();

    // Figure caption should be visible
    await expect(aboutPage.getByText(/Figure 1:.*Location of the EAC moorings/)).toBeVisible();
  });

  test('about page has navbar and footer', async ({ aboutPage }) => {
    await aboutPage.gotoEacMooringArray();

    // At least one navbar (mobile or desktop) should be present
    await expect(aboutPage.navbar.root).toBeAttached();

    // Footer should be present
    await expect(aboutPage.footer).toBeAttached();
  });

  test('about page has no sidebar or menu bar', async ({ aboutPage }) => {
    await aboutPage.gotoEacMooringArray();

    // Product sidebar should not be present
    await expect(aboutPage.page.locator('[data-testid="product-sidebar"]')).not.toBeVisible();
  });

  test('"Explore dataset" button navigates to product page with latest date', async ({ aboutPage }) => {
    await aboutPage.gotoEacMooringArray();

    await expect(aboutPage.exploreDatasetButton).toBeVisible();
    await aboutPage.exploreDatasetButton.click();
    await aboutPage.page.waitForLoadState('load');

    expect(aboutPage.url()).toContain('/product/eac-mooring-array');
    // URL should include region and date from latest-dates API
    await aboutPage.page.waitForURL(/region=.+&date=\d+/, { timeout: 10000 });
    expect(aboutPage.url()).toMatch(/region=.+&date=\d+/);
  });

  test('about page shows error for product without about content', async ({ aboutPage }) => {
    await aboutPage.goto('/about/four-hour-sst/sst');

    await expect(aboutPage.getByText('About Content Not Available')).toBeVisible();
  });

  test('about page shows error for invalid product', async ({ aboutPage }) => {
    await aboutPage.goto('/about/nonexistent-product');

    await expect(aboutPage.getByText('About Content Not Available')).toBeVisible();
  });

  test('about page is directly accessible via URL (shareable)', async ({ aboutPage }) => {
    // Simulate landing on about page directly (no prior navigation)
    await aboutPage.gotoEacMooringArray();

    // Content should render without needing to come from product page
    await expect(aboutPage.getByText('EAC Mooring Array (2012-2022)')).toBeVisible();
    await expect(aboutPage.exploreDatasetButton).toBeVisible();
  });
});
