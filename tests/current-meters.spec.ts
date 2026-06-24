import { test, expect } from './fixtures';

test.describe('Current Meters Tests', () => {
  test('back button returns to map view after region polygon click', async ({ page }) => {
    // Issue #8441: clicking a region polygon from /map/current-meters/...
    // used to push extra history entries via setSearchParams during the
    // fix-up effect, trapping the user when they pressed back.
    await page.goto('/map/current-meters/moored-instrument-array');

    const mapCanvas = page.locator('.mapboxgl-canvas').first();
    await expect(mapCanvas).toBeVisible();
    // Wait for mapbox layers to render before clicking.
    await page.waitForTimeout(2000);

    // The map page renders region polygons as mapbox layers on canvas, so we
    // click multiple points until the URL navigates to a product page.
    const box = await mapCanvas.boundingBox();
    if (!box) throw new Error('Map canvas not visible');

    const clickPoints = [
      { x: 0.5, y: 0.5 },
      { x: 0.4, y: 0.4 },
      { x: 0.6, y: 0.6 },
      { x: 0.3, y: 0.5 },
      { x: 0.5, y: 0.3 },
      { x: 0.7, y: 0.5 },
      { x: 0.35, y: 0.35 },
      { x: 0.65, y: 0.65 },
    ];
    for (const point of clickPoints) {
      await page.mouse.click(box.x + box.width * point.x, box.y + box.height * point.y);
      try {
        await page.waitForURL(/\/product\/current-meters\//, { timeout: 2000 });
        break;
      } catch {
        await page.waitForTimeout(200);
      }
    }
    expect(page.url()).toMatch(/\/product\/current-meters\//);

    // Press the browser back button — it should return us to the map view
    // on the first press (no history pollution).
    await page.goBack();
    await page.waitForURL(/\/map\/current-meters\/moored-instrument-array/);
    expect(page.url()).toMatch(/\/map\/current-meters\/moored-instrument-array/);
  });

  test('moored-instrument-array product URL has no deploymentPlot when no plot is selected', async ({ page }) => {
    // The previous bug left an empty `&deploymentPlot=` in the URL on the
    // moored-instrument-array sub-product because the overview map is the
    // default. omitEmptyParams + the fix-up effect should keep the URL clean.
    await page.goto('/product/current-meters/moored-instrument-array?region=01_Aust&date=0000');
    // Wait for the product sidebar to mount so its fix-up effect has run.
    await expect(page.getByText('Region', { exact: true })).toBeVisible();
    // Give the fix-up effect a small window to write to the URL if it intends to.
    await page.waitForTimeout(500);

    expect(page.url()).not.toContain('deploymentPlot=');
  });

  test('switching from shelf to moored-instrument-array drops the stale deploymentPlot', async ({ page }) => {
    // Shelf's fix-up effect auto-populates the first Shelf plot in the URL.
    // When the user switches back to moored-instrument-array, the stale plot
    // must be cleared so the overview map is shown instead of the plot view.
    await page.goto('/product/current-meters/shelf');
    // Wait for the Shelf fix-up to write a deploymentPlot into the URL.
    await page.waitForURL(/deploymentPlot=/, { timeout: 5000 });
    expect(page.url()).toContain('deploymentPlot=');

    // Click the "Moored Instrument Array" sub-product button.
    const miaButton = page.getByRole('button', { name: /moored instrument array/i }).first();
    await expect(miaButton).toBeVisible();
    await miaButton.click();

    await page.waitForURL(
      (url) => url.pathname.endsWith('/moored-instrument-array') && !url.search.includes('deploymentPlot='),
      { timeout: 5000 },
    );
    expect(page.url()).not.toContain('deploymentPlot=');
  });

  test('direct URL to moored-instrument-array with deploymentPlot preserves the plot', async ({ page }) => {
    // Sanity check: BasicMap's mount effect previously reset the current
    // meters store every time the sidebar mini map mounted. With the
    // isMiniMap guard, a direct URL that includes a plot must round-trip cleanly.
    await page.goto(
      '/product/current-meters/moored-instrument-array?region=01_Aust&date=0000&depth=1&property=vrms&deploymentPlot=NWSLYN',
    );
    // Wait for the product sidebar to mount.
    await expect(page.getByText('Region', { exact: true })).toBeVisible();
    // Give the BasicMap mount effect a window to (incorrectly) clear it.
    await page.waitForTimeout(800);

    expect(page.url()).toContain('deploymentPlot=NWSLYN');
  });
});
