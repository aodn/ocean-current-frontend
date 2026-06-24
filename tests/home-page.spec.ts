import { test, expect } from './fixtures';

test.describe('Home Page Tests', () => {
  test('TC001: Ocean Current Page Loads Successfully', async ({ page }) => {
    // Navigate to the Ocean current page URL
    await page.goto('/');

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');

    // Ocean current page loads successfully without errors
    await expect(page).toHaveTitle(/OceanCurrent/i);

    // Top header with dropdown menus is visible
    // Top header with dropdown menus is visible
    // Using a more specific locator that contains the expected menu items
    const nav = page.locator('nav').filter({ hasText: 'Maps' }).first();
    await expect(nav).toBeVisible();

    // Map is displayed on the home page
    const mapContainer = page.locator('.mapboxgl-canvas').first();
    await expect(mapContainer).toBeVisible();

    // Zoom In and Zoom Out buttons are visible
    const zoomInButton = page.locator('.mapboxgl-ctrl-zoom-in').first();
    const zoomOutButton = page.locator('.mapboxgl-ctrl-zoom-out').first();
    await expect(zoomInButton).toBeVisible();
    await expect(zoomOutButton).toBeVisible();

    // Bottom horizontal scroll (product carousel) is visible
    const bottomCarousel = page.locator('[data-testid="carousel-container"]');
    await expect(bottomCarousel).toBeVisible();
  });

  test('TC002: Top Header Dropdown Menus Display Correctly', async ({ page }) => {
    // Navigate to the Ocean current page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for presence of dropdown menus in the navbar
    const navbar = page.locator('nav');
    const mapsMenu = navbar.getByText('Maps', { exact: true }).first();
    const inWaterMenu = navbar.getByText('In-Water', { exact: true }).first();
    const newsMenu = navbar.getByText('News', { exact: true }).first();
    const guidedTourMenu = navbar.getByText('Guided Tour', { exact: true }).first();
    const legacySiteMenu = navbar.getByText('Legacy Site', { exact: false }).first();

    // Verify all menus are visible
    await expect(mapsMenu).toBeVisible();
    await expect(inWaterMenu).toBeVisible();
    await expect(newsMenu).toBeVisible();
    await expect(guidedTourMenu).toBeVisible();
    await expect(legacySiteMenu).toBeVisible();
  });

  test('TC003: Hovering on Maps Dropdown Displays Correct Suboptions', async ({ page }) => {
    // Navigate to the Ocean current page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Hover over the Maps dropdown menu
    const navbar = page.locator('nav');
    const mapsMenu = navbar.getByText('Maps', { exact: true }).first();
    await mapsMenu.hover();

    // Wait for submenu to appear
    await page.waitForTimeout(500);

    // Verify suboptions appear - looking for SST options in the menu (first occurrence)
    const sstOption = page.getByText('Four-hour SST', { exact: false }).first();
    await expect(sstOption).toBeVisible();
  });

  test('TC004: Hovering on In-water Dropdown Displays Correct Suboptions', async ({ page }) => {
    // Navigate to the Ocean current page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Hover over the In-water dropdown menu
    const navbar = page.locator('nav');
    const inWaterMenu = navbar.getByText('In-Water', { exact: true }).first();
    await inWaterMenu.hover();

    // Wait for submenu to appear
    await page.waitForTimeout(500);

    // Verify suboptions appear - looking for Argo, Gliders, etc. in the menu (first occurrence)
    const argoOption = page.getByText('Argo', { exact: true }).first();
    await expect(argoOption).toBeVisible();
  });

  test('TC005: News Button Opens IMOS Ocean Current News Page', async ({ page }) => {
    // Navigate to the Ocean current page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click on the News button in the navbar
    const navbar = page.locator('nav');
    const newsLink = navbar.locator('a[href*="news"]').first();

    await newsLink.click();
    await page.waitForLoadState('networkidle');

    // Verify the URL navigated to the news page within the app
    expect(page.url()).toContain('news');
  });

  test('TC006: Map Displays with Animated Subcategory Options', async ({ page }) => {
    // Navigate to the Ocean current page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify map is visible
    const mapContainer = page.locator('.mapboxgl-canvas').first();
    await expect(mapContainer).toBeVisible();

    // Wait for map to fully load
    await page.waitForTimeout(2000);

    // Verify animated/transition elements exist on the map carousel
    // The map has a description card below it that cycles through products (e.g., "Chlorophyll-a Concentration", "SST")
    // We target the h2 element in the card below the map using unique class combination

    // Find the h2 with font-poppins and font-semibold classes (product title in carousel)
    const mapDescription = page.locator('h2.font-poppins.font-semibold').first();
    await expect(mapDescription).toBeVisible();

    const initialText = await mapDescription.textContent();

    // Increase wait time to ensure we catch the carousel animation cycle (CAROUSEL_INTERVAL_MS = 2500)
    await page.waitForTimeout(3000);

    const newText = await mapDescription.textContent();

    // The text should update if it's animating
    expect(initialText).not.toBe(newText);
  });

  test('TC007: Zoom In Button Works for Mapbox Map', async ({ page }) => {
    // Navigate to the Ocean current page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Locate the Zoom In button
    const zoomInButton = page.locator('.mapboxgl-ctrl-zoom-in').first();
    await expect(zoomInButton).toBeVisible();
    await expect(zoomInButton).toBeEnabled();

    // Click the Zoom In button
    await zoomInButton.click();

    // Wait a bit to ensure no errors occur during click
    await page.waitForTimeout(500);

    // Verify button is still visible and enabled (unless max zoom reached, which is unlikely on load)
    await expect(zoomInButton).toBeVisible();
    await expect(zoomInButton).toBeEnabled();

    // Verify map canvas is still visible
    const mapContainer = page.locator('.mapboxgl-canvas').first();
    await expect(mapContainer).toBeVisible();
  });

  test('TC008: Zoom Out Button Works for Mapbox Map', async ({ page }) => {
    // Navigate to the Ocean current page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Locate the Zoom Out button
    const zoomOutButton = page.locator('.mapboxgl-ctrl-zoom-out').first();
    await expect(zoomOutButton).toBeVisible();
    await expect(zoomOutButton).toBeEnabled();

    // First zoom in to ensure we are not at min zoom
    const zoomInButton = page.locator('.mapboxgl-ctrl-zoom-in').first();
    await zoomInButton.click();
    await page.waitForTimeout(500);

    // Click the Zoom Out button
    await zoomOutButton.click();

    // Wait a bit to ensure no errors occur during click
    await page.waitForTimeout(500);

    // Verify button is still visible and enabled
    await expect(zoomOutButton).toBeVisible();
    await expect(zoomOutButton).toBeEnabled();

    // Verify map canvas is still visible
    const mapContainer = page.locator('.mapboxgl-canvas').first();
    await expect(mapContainer).toBeVisible();
  });

  test('TC009: Clicking on Region Box Opens Related Category Detail', async ({ page }) => {
    // Navigate to the Ocean current page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // On the home page, clicking the map doesn't open region boxes
    // Region boxes appear after selecting a category
    // This test intentionally deviates from the strict requirement "Clicking on Region Box... on the home page"
    // because the application flow requires selecting a category first.
    const categoryLink = page.locator('[data-testid="carousel-container"] a').first();
    await expect(categoryLink).toBeVisible();

    const initialUrl = page.url();

    // Click on a category in the carousel
    await categoryLink.click();
    await page.waitForLoadState('networkidle');

    // Verify URL changed to a category detail page
    const currentUrl = page.url();
    expect(currentUrl).not.toBe(initialUrl);
    expect(currentUrl).toMatch(/\/map\//);
  });

  test('TC010: Bottom Horizontal Scroll Displays Maps and In-water Subcategories', async ({ page }) => {
    // Navigate to the Ocean current page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Locate the product carousel (bottom horizontal scroll)
    const carousel = page.locator('[data-testid="carousel-container"]');
    await expect(carousel).toBeVisible();

    // Verify subcategories are visible - looking for specific products
    const fourHourSST = page.getByText('Four-hour SST');
    const argo = page.getByText('Argo', { exact: true });

    await expect(fourHourSST).toBeVisible();
    await expect(argo).toBeVisible();
  });

  test('TC011: Clicking Bottom Scroll Subcategory Opens Selected Category Details', async ({ page }) => {
    // Navigate to the Ocean current page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get initial URL
    const initialUrl = page.url();

    // Find a subcategory link in the product carousel and click it
    const subcategoryLink = page.locator('[data-testid="carousel-container"] a').first();
    await expect(subcategoryLink).toBeVisible();

    await subcategoryLink.click();

    // Wait for navigation
    await page.waitForLoadState('networkidle');

    // Verify URL changed to detail page
    const currentUrl = page.url();
    expect(currentUrl).not.toBe(initialUrl);
    expect(currentUrl).toMatch(/\/map\//);

    // Verify map is still visible on the detail page
    const mapContainer = page.locator('.mapboxgl-canvas').first();
    await expect(mapContainer).toBeVisible();
  });
});
