import { test, expect } from '../../fixtures/base-test';

test.describe('Detail Page Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.load();
  });

  test('TC-767: Open Category Details Page from Home Page', async ({ homePage, mapPage }) => {
    const homeUrl = homePage.url();

    await homePage.carousel.openFirstProduct();

    const mapUrl = homePage.url();
    expect(mapUrl).not.toBe(homeUrl);
    expect(mapUrl).toMatch(/\/map\//);

    await mapPage.map.expectVisible();

    // Verify region boxes or similar map overlays are present
    const regionBoxes = mapPage.page.locator('[class*="region"], svg rect, svg polygon');
    const boxCount = await regionBoxes.count();
    expect(boxCount).toBeGreaterThan(0);
  });

  test('TC-768: Display Region Boxes on Map for Selected Category', async ({ homePage, mapPage }) => {
    const homeUrl = homePage.url();

    await homePage.carousel.openFirstProduct();

    const mapUrl = homePage.url();
    expect(mapUrl).not.toBe(homeUrl);
    expect(mapUrl).toMatch(/\/map\//);

    await mapPage.map.expectVisible();

    // Verify region boxes or similar map overlays are present
    const regionBoxes = mapPage.page.locator('[class*="region"], svg rect, svg polygon');
    const boxCount = await regionBoxes.count();
    expect(boxCount).toBeGreaterThan(0);
  });

  test('TC-769: Open Data Details and Image by Clicking Region Box', async ({ homePage, mapPage }) => {
    // Navigate to home and then to category details page
    await homePage.carousel.openFirstProduct();

    // Wait for the map to be fully loaded and interactive
    await mapPage.map.expectVisible();

    // Wait for map layers to render (region boxes take time to load)
    await mapPage.page.waitForTimeout(3000);

    // Get current URL before clicking region
    const urlBeforeClick = mapPage.url();

    // Click on the map canvas to select a region
    // Region boxes are rendered as mapbox layers, clicking anywhere should trigger region selection
    // Since we can't easily target specific regions in the canvas without access to the map instance or data-attributes,
    // we use a retry mechanism to click different parts of the map.
    const box = await mapPage.map.canvas.boundingBox();
    if (box) {
      // Define a few points to try clicking (center, slightly off-center)
      // These are relative coordinates (0.0 to 1.0)
      const clickPoints = [
        { x: 0.5, y: 0.5 },
        { x: 0.4, y: 0.4 },
        { x: 0.6, y: 0.6 },
        { x: 0.3, y: 0.5 },
        { x: 0.7, y: 0.5 },
        { x: 0.35, y: 0.35 },
        { x: 0.65, y: 0.65 },
      ];

      for (const point of clickPoints) {
        // Click on the map
        await mapPage.page.mouse.click(box.x + box.width * point.x, box.y + box.height * point.y);

        // Wait for potential URL change (region selection)
        try {
          await mapPage.page.waitForFunction(
            (url) => window.location.href !== url || window.location.href.includes('region='),
            urlBeforeClick,
            { timeout: 2000 }, // Increased timeout for retry
          );

          // If we get here, the URL changed!
          break;
        } catch {
          // Continue to next point
          await mapPage.page.waitForTimeout(200);
        }
      }

      // Check if URL changed (region was selected)
      const urlAfterClick = mapPage.url();

      // Verify URL changed with region parameter
      const urlHasRegion = urlAfterClick.includes('region=');

      // We strictly expect the URL to change to include the region parameter.
      // The previous check for 'canvas' count was too loose as the map itself is a canvas.
      expect(urlHasRegion).toBeTruthy();
    }
  });

  test('TC-770: Date Selector Default to Latest Available Data Date', async ({ homePage, mapPage, productPage }) => {
    // Navigate to home and select a category
    await homePage.carousel.openFirstProduct();

    // Wait for the map to be fully loaded and interactive
    await mapPage.map.expectVisible();

    const box = await mapPage.map.canvas.boundingBox();
    if (box) {
      // Click to select a region
      await mapPage.map.clickFixedRegionBox(box);

      // Check if we successfully selected a region
      if (productPage.url().includes('region=')) {
        // Wait a bit for the date picker to appear
        await expect(productPage.datePicker).toBeVisible();
        const datePickerExists = await productPage.selectedDate.count();

        if (datePickerExists > 0) {
          await expect(productPage.selectedDate).toBeVisible();

          // Get the date value
          const dateValue = await productPage.getSelectedDateValue();

          // Verify the date is recent (within last 30 days as a reasonable check for "latest")
          // Note: This is a heuristic. Ideally, we should fetch the expected latest date from an API
          // or have a deterministic mock state. For now, we assume data is relatively fresh.
          const selectedDate = new Date(Number(dateValue));
          const today = new Date();
          const daysDifference = Math.floor((today.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24));

          // The date should be recent (within last 30 days for ocean data)
          expect(daysDifference).toBeLessThanOrEqual(30);
        }
      }
    }
  });

  test('TC-771: Change Date Using Date Selector', async ({ homePage, mapPage, productPage }) => {
    // Navigate to home and select a category
    await homePage.carousel.openFirstProduct();

    // Wait for the map to be fully loaded and interactive
    await mapPage.map.expectVisible();

    const box = await mapPage.map.canvas.boundingBox();
    if (box) {
      await mapPage.map.clickFixedRegionBox(box);

      if (productPage.url().includes('region=')) {
        await expect(productPage.datePicker).toBeVisible();
        const datePickerExists = await productPage.selectedDate.count();

        if (datePickerExists > 0) {
          await expect(productPage.selectedDate).toBeVisible();

          // Get initial date
          const initialDate = await productPage.getSelectedDateValue();

          // Select a different date (go back a few days)
          const newDate = new Date();
          newDate.setDate(newDate.getDate() - 3);
          const newDateString = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;

          await productPage.datePicker.fill(newDateString);

          // Wait for the data to update
          await productPage.page.waitForLoadState('load');

          // Verify the date changed
          const updatedDate = await productPage.getSelectedDateValue();
          expect(updatedDate).not.toBe(initialDate);

          // Verify the map or image is still visible
          const canvas = productPage.page.locator('canvas').first();
          await expect(canvas).toBeVisible();
        }
      }
    }
  });

  test('TC-772: Refresh Button Resets Date to Latest Available Data Date', async ({
    homePage,
    mapPage,
    productPage,
  }) => {
    // Navigate to home and select a category
    await homePage.carousel.openFirstProduct();

    // Wait for the map to be fully loaded and interactive
    await mapPage.map.expectVisible();

    const box = await mapPage.map.canvas.boundingBox();
    if (box) {
      await mapPage.map.clickFixedRegionBox(box);

      if (productPage.url().includes('region=')) {
        await expect(productPage.datePicker).toBeVisible();

        const datePickerExists = await productPage.selectedDate.count();

        if (datePickerExists > 0) {
          await expect(productPage.selectedDate).toBeVisible();

          // Get the initial (latest) date
          const initialDate = await productPage.getSelectedDateValue();

          // Change the date to a past date
          const pastDate = new Date();
          pastDate.setDate(pastDate.getDate() - 5);
          await productPage.datePicker.fill(
            `${pastDate.getFullYear()}-${String(pastDate.getMonth() + 1).padStart(2, '0')}-${String(pastDate.getDate()).padStart(2, '0')}`,
          );

          // Click the refresh/reset button using data-testid
          const refreshButton = productPage.resetDateButton;

          const refreshButtonExists = await refreshButton.count();
          if (refreshButtonExists > 0) {
            await refreshButton.click();
            await productPage.page.waitForLoadState('load');

            // Verify date reset to latest
            const resetDate = await productPage.getSelectedDateValue();
            expect(resetDate).toBe(initialDate);
          }
        }
      }
    }
  });

  test('TC-773: Left Arrow Changes Date to Previous Available Data', async ({ homePage, mapPage, productPage }) => {
    // Navigate to home and select a category
    await homePage.carousel.openFirstProduct();

    // Wait for the map to be fully loaded and interactive
    await mapPage.map.expectVisible();

    const box = await mapPage.map.canvas.boundingBox();
    if (box) {
      await mapPage.map.clickFixedRegionBox(box);

      if (productPage.url().includes('region=')) {
        await expect(productPage.datePicker).toBeVisible();
        const datePickerExists = await productPage.selectedDate.count();

        if (datePickerExists > 0) {
          await expect(productPage.selectedDate).toBeVisible();

          // Get initial date
          const initialDate = await productPage.getSelectedDateValue();

          // Click the left/previous arrow using data-testid
          const leftArrow = productPage.datePreviousButton;
          const leftArrowExists = await leftArrow.count();

          if (leftArrowExists > 0) {
            await leftArrow.click();
            await productPage.page.waitForLoadState('load');

            // Verify date changed to previous
            const newDate = await productPage.getSelectedDateValue();
            expect(newDate).not.toBe(initialDate);

            // Verify new date is earlier than initial date
            const initialDateTime = new Date(Number(initialDate)).getTime();
            const newDateTime = new Date(Number(newDate)).getTime();
            expect(newDateTime).toBeLessThan(initialDateTime);
          }
        }
      }
    }
  });

  test('TC-774: Right Arrow Changes Date to Next Available Data', async ({ homePage, mapPage, productPage }) => {
    // Navigate to home and select a category
    await homePage.carousel.openFirstProduct();

    // Wait for the map to be fully loaded and interactive
    await mapPage.map.expectVisible();
    const box = await mapPage.map.canvas.boundingBox();
    if (box) {
      await mapPage.map.clickFixedRegionBox(box);

      if (productPage.url().includes('region=')) {
        await expect(productPage.datePicker).toBeVisible();
        const datePickerExists = await productPage.selectedDate.count();

        if (datePickerExists > 0) {
          await expect(productPage.selectedDate).toBeVisible();

          // First go back one day so we can go forward
          const leftArrow = productPage.datePreviousButton;
          const leftArrowExists = await leftArrow.count();

          if (leftArrowExists > 0) {
            await leftArrow.click();
            await productPage.page.waitForLoadState('load');

            // Get current date
            const currentDate = await productPage.getSelectedDateValue();

            // Click the right arrow using data-testid
            const rightArrow = productPage.dateNextButton;
            const rightArrowExists = await rightArrow.count();

            if (rightArrowExists > 0) {
              await rightArrow.click();
              await productPage.page.waitForLoadState('load');

              // Verify date changed to next
              const newDate = await productPage.getSelectedDateValue();
              expect(newDate).not.toBe(currentDate);

              // Verify new date is later than current date
              const currentDateTime = new Date(Number(currentDate)).getTime();
              const newDateTime = new Date(Number(newDate)).getTime();
              expect(newDateTime).toBeGreaterThan(currentDateTime);
            }
          }
        }
      }
    }
  });
});
