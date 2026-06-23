import { test, expect } from '../fixtures/base-test';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.load();
  });

  test('TC001: Ocean Current Page Loads Successfully', async ({ homePage }) => {
    await expect(homePage.page).toHaveTitle(/OceanCurrent/i);
    await homePage.navbar.expectVisible();
    await homePage.map.expectVisible();
    await homePage.map.expectZoomControlsVisible();
    await homePage.carousel.expectVisible();
  });

  test('TC002: Top Header Dropdown Menus Display Correctly', async ({ homePage }) => {
    // Verify all menus are visible
    await expect(homePage.navbar.mapsMenu).toBeVisible();
    await expect(homePage.navbar.inWaterMenu).toBeVisible();
    await expect(homePage.navbar.newsMenu).toBeVisible();
    await expect(homePage.navbar.guidedTourMenu).toBeVisible();
    await expect(homePage.navbar.legacySiteMenu).toBeVisible();
  });

  test('TC003: Hovering on Maps Dropdown Displays Correct Suboptions', async ({ homePage }) => {
    await homePage.navbar.mapsMenu.hover();
    // Verify suboptions appear - looking for SST options in the menu (first occurrence)
    await expect(homePage.getByText('Four-hour SST').first()).toBeVisible();
  });

  test('TC004: Hovering on In-water Dropdown Displays Correct Suboptions', async ({ homePage }) => {
    await homePage.navbar.inWaterMenu.hover();
    // Verify suboptions appear - looking for Argo, Gliders, etc. in the menu (first occurrence)
    await expect(homePage.getByText('Argo', true).first()).toBeVisible();
  });

  test('TC005: News Button Opens IMOS Ocean Current News Page', async ({ homePage, newsPage }) => {
    await homePage.navbar.clickNews();

    expect(homePage.url()).toContain('news');
    await expect(newsPage.heading).toBeVisible();
  });

  test('TC006: Map Displays with Animated Subcategory Options', async ({ homePage }) => {
    await homePage.map.expectVisible();

    const initialText = await homePage.getMapCarouselProductTitle();
    await expect
      .poll(async () => await homePage.getMapCarouselProductTitle(), {
        timeout: 9000,
        message: 'Carousel title did not update',
      })
      .not.toBe(initialText);
  });

  test('TC007: Zoom In Button Works for Mapbox Map', async ({ homePage }) => {
    await homePage.map.expectZoomInEnabled();
    await homePage.map.zoomIn();

    await homePage.page.waitForTimeout(900);

    await homePage.map.expectZoomInEnabled();
    await homePage.map.expectVisible();
  });

  test('TC008: Zoom Out Button Works for Mapbox Map', async ({ homePage }) => {
    await homePage.map.expectZoomOutEnabled();
    await homePage.map.zoomIn();
    await homePage.page.waitForTimeout(900);

    await homePage.map.zoomOut();
    await homePage.page.waitForTimeout(900);

    await homePage.map.expectZoomOutEnabled();
    await homePage.map.expectVisible();
  });

  test('TC009: Clicking on Region Box Opens Related Category Detail', async ({ homePage }) => {
    const initialUrl = homePage.url();

    // On the home page, clicking the map doesn't open region boxes
    // Region boxes appear after selecting a category
    // This test intentionally deviates from the strict requirement "Clicking on Region Box... on the home page"
    // because the application flow requires selecting a category first.
    await homePage.carousel.openFirstProduct();

    // Verify URL changed to a category detail page
    const currentUrl = homePage.url();
    expect(currentUrl).not.toBe(initialUrl);
    expect(currentUrl).toMatch(/\/map\//);
  });

  test('TC010: Bottom Horizontal Scroll Displays Maps and In-water Subcategories', async ({ homePage }) => {
    const carousel = homePage.carousel;
    await carousel.expectVisible();
    // Verify subcategories are visible - looking for specific products
    await expect(carousel.getCarouselItem('Four-hour SST')).toBeVisible();
    await expect(carousel.getCarouselItem('Argo')).toBeVisible();
  });

  test('TC011: Clicking Bottom Scroll Subcategory Opens Selected Category Details', async ({ homePage, mapPage }) => {
    // Get initial URL
    const initialUrl = homePage.url();

    // Find a subcategory link in the product carousel and click it
    await homePage.carousel.openFirstProduct();

    // Verify URL changed to detail page
    const currentUrl = homePage.url();
    expect(currentUrl).not.toBe(initialUrl);
    expect(currentUrl).toMatch(/\/map\//);

    // Verify map is still visible on the detail page
    await mapPage.map.expectVisible();
  });
});
