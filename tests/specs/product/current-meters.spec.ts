import { test, expect } from '../../fixtures/base-test';

test.describe('Current Meters Tests', () => {
  test('back button returns to map view after region polygon click', async ({ productPage, mapPage }) => {
    // Issue #8441: clicking a region polygon from /map/current-meters/...
    // used to push extra history entries via setSearchParams during the
    // fix-up effect, trapping the user when they pressed back.
    await mapPage.goto('/map/current-meters/moored-instrument-array');

    await mapPage.map.expectVisible();
    // Wait for mapbox layers to render before clicking.
    await mapPage.page.waitForTimeout(2000);

    // The map page renders region polygons as mapbox layers on canvas, so we
    // click multiple points until the URL navigates to a product page.
    const box = await mapPage.map.canvas.boundingBox();
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
      await mapPage.page.mouse.click(box.x + box.width * point.x, box.y + box.height * point.y);
      try {
        await mapPage.page.waitForURL(/\/product\/current-meters\//, { timeout: 2000 });
        break;
      } catch {
        await mapPage.page.waitForTimeout(200);
      }
    }
    expect(productPage.url()).toMatch(/\/product\/current-meters\//);

    // Press the browser back button — it should return us to the map view
    // on the first press (no history pollution).
    await productPage.page.goBack();
    await mapPage.page.waitForURL(/\/map\/current-meters\/moored-instrument-array/);
    expect(mapPage.url()).toMatch(/\/map\/current-meters\/moored-instrument-array/);
  });

  test('moored-instrument-array product URL has no deploymentPlot when no plot is selected', async ({
    productPage,
  }) => {
    // The previous bug left an empty `&deploymentPlot=` in the URL on the
    // moored-instrument-array sub-product because the overview map is the
    // default. omitEmptyParams + the fix-up effect should keep the URL clean.
    await productPage.goto('/product/current-meters/moored-instrument-array?region=01_Aust&date=0000');
    // Wait for the product sidebar to mount so its fix-up effect has run.
    await expect(productPage.regionLabel).toBeVisible();
    // Give the fix-up effect a small window to write to the URL if it intends to.
    await productPage.page.waitForTimeout(500);

    expect(productPage.url()).not.toContain('deploymentPlot=');
  });

  test('switching from shelf to moored-instrument-array drops the stale deploymentPlot', async ({ productPage }) => {
    // Shelf's fix-up effect auto-populates the first Shelf plot in the URL.
    // When the user switches back to moored-instrument-array, the stale plot
    // must be cleared so the overview map is shown instead of the plot view.
    await productPage.goto('/product/current-meters/shelf');
    // Wait for the Shelf fix-up to write a deploymentPlot into the URL.
    await productPage.page.waitForURL(/deploymentPlot=/, { timeout: 5000 });
    expect(productPage.url()).toContain('deploymentPlot=');

    // Click the "Moored Instrument Array" sub-product button.
    await expect(productPage.mooredInstrumentArrayButton).toBeVisible();
    await productPage.mooredInstrumentArrayButton.click();

    await productPage.page.waitForURL(
      (url) => url.pathname.endsWith('/moored-instrument-array') && !url.search.includes('deploymentPlot='),
      { timeout: 5000 },
    );
    expect(productPage.url()).not.toContain('deploymentPlot=');
  });

  test('direct URL to moored-instrument-array with deploymentPlot preserves the plot', async ({ productPage }) => {
    // Sanity check: BasicMap's mount effect previously reset the current
    // meters store every time the sidebar mini map mounted. With the
    // isMiniMap guard, a direct URL that includes a plot must round-trip cleanly.
    await productPage.goto(
      '/product/current-meters/moored-instrument-array?region=01_Aust&date=0000&depth=1&property=vrms&deploymentPlot=NWSLYN',
    );
    // Wait for the product sidebar to mount.
    await expect(productPage.regionLabel).toBeVisible();
    // Give the BasicMap mount effect a window to (incorrectly) clear it.
    await productPage.page.waitForTimeout(800);

    expect(productPage.url()).toContain('deploymentPlot=NWSLYN');
  });
});
