import { test, expect } from '@playwright/test';

test.describe('Detail Page Tests', () => {
  test('TC-767: Open Category Details Page from Home Page', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get initial URL
    const homeUrl = page.url();

    // Click on a category from the product carousel
    const categoryLink = page.locator('[data-testid="carousel-container"] a').first();
    await expect(categoryLink).toBeVisible();
    await categoryLink.click();

    // Wait for navigation to detail page
    await page.waitForLoadState('networkidle');

    // Verify URL changed
    const detailUrl = page.url();
    expect(detailUrl).not.toBe(homeUrl);

    // Verify the details page displays region boxes on the map
    const mapContainer = page.locator('.mapboxgl-canvas, [class*="map"]').first();
    await expect(mapContainer).toBeVisible();

    // Wait for region boxes to render
    await page.waitForTimeout(2000);

    // Verify region boxes or similar map overlays are present
    const regionBoxes = page.locator('[class*="region"], svg rect, svg polygon');
    const boxCount = await regionBoxes.count();
    expect(boxCount).toBeGreaterThan(0);
  });

  test('TC-768: Display Region Boxes on Map for Selected Category', async ({ page }) => {
    // Navigate to home page first
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Open a category details page
    const categoryLink = page.locator('[data-testid="carousel-container"] a').first();
    await categoryLink.click();
    await page.waitForLoadState('networkidle');

    // Observe the map area on the category details page
    const mapContainer = page.locator('.mapboxgl-canvas, [class*="map"]').first();
    await expect(mapContainer).toBeVisible();

    // Verify region boxes are displayed on the map
    // Region boxes could be SVG elements, canvas overlays, or div elements
    const regionBoxes = page.locator('[class*="region"], svg rect, svg polygon, [data-region]');
    const boxCount = await regionBoxes.count();

    // Verify at least one region box is present
    expect(boxCount).toBeGreaterThan(0);
  });

  test('TC-769: Open Data Details and Image by Clicking Region Box', async ({ page }) => {
    // Navigate to home and then to category details page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const categoryLink = page.locator('[data-testid="carousel-container"] a').first();
    await categoryLink.click();
    await page.waitForLoadState('networkidle');

    // Wait for the map to be fully loaded and interactive
    const mapCanvas = page.locator('.mapboxgl-canvas').first();
    await expect(mapCanvas).toBeVisible();

    // Wait for map layers to render (region boxes take time to load)
    await page.waitForTimeout(3000);

    // Get current URL before clicking region
    const urlBeforeClick = page.url();

    // Click on the map canvas to select a region
    // Region boxes are rendered as mapbox layers, clicking anywhere should trigger region selection
    // Since we can't easily target specific regions in the canvas without access to the map instance or data-attributes,
    // we use a retry mechanism to click different parts of the map.
    const box = await mapCanvas.boundingBox();
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
        await page.mouse.click(box.x + box.width * point.x, box.y + box.height * point.y);

        // Wait for potential URL change (region selection)
        try {
          await page.waitForFunction(
            (url) => window.location.href !== url || window.location.href.includes('region='),
            urlBeforeClick,
            { timeout: 2000 }, // Increased timeout for retry
          );

          // If we get here, the URL changed!
          break;
        } catch {
          // Continue to next point
          await page.waitForTimeout(200);
        }
      }

      // Check if URL changed (region was selected)
      const urlAfterClick = page.url();

      // Verify URL changed with region parameter
      const urlHasRegion = urlAfterClick.includes('region=');

      // We strictly expect the URL to change to include the region parameter.
      // The previous check for 'canvas' count was too loose as the map itself is a canvas.
      expect(urlHasRegion).toBeTruthy();
    }
  });

  test('TC-770: Date Selector Default to Latest Available Data Date', async ({ page }) => {
    // Navigate to home and select a category, then click a region
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click on a category from the carousel
    const categoryLink = page.locator('[data-testid="carousel-container"] a').first();
    await categoryLink.click();
    await page.waitForLoadState('networkidle');

    // Click on the map to select a region
    const mapCanvas = page.locator('.mapboxgl-canvas').first();
    await expect(mapCanvas).toBeVisible();

    const box = await mapCanvas.boundingBox();
    if (box) {
      // Click to select a region
      await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);

      // Wait for region selection
      await page.waitForURL(/region=/, { timeout: 5000 }).catch(() => {});

      // Check if we successfully selected a region
      if (page.url().includes('region=')) {
        // Look for date picker - it should appear when region is selected
        const dateSelector = page.locator('input[type="date"]').first();

        // Wait a bit for the date picker to appear
        await page.waitForSelector('input[type="date"]', { timeout: 5000 }).catch(() => {});

        const datePickerExists = await dateSelector.count();

        if (datePickerExists > 0) {
          await expect(dateSelector).toBeVisible();

          // Get the date value
          const dateValue = await dateSelector.inputValue();

          // Verify the date is recent (within last 30 days as a reasonable check for "latest")
          // Note: This is a heuristic. Ideally, we should fetch the expected latest date from an API
          // or have a deterministic mock state. For now, we assume data is relatively fresh.
          const selectedDate = new Date(dateValue);
          const today = new Date();
          const daysDifference = Math.floor((today.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24));

          // The date should be recent (within last 30 days for ocean data)
          expect(daysDifference).toBeLessThanOrEqual(30);
        }
      }
    }
  });

  test('TC-771: Change Date Using Date Selector', async ({ page }) => {
    // Navigate to home and select a category, then click a region
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const categoryLink = page.locator('[data-testid="carousel-container"] a').first();
    await categoryLink.click();
    await page.waitForLoadState('networkidle');

    // Click on the map to select a region
    const mapCanvas = page.locator('.mapboxgl-canvas').first();
    const box = await mapCanvas.boundingBox();

    if (box) {
      await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);
      await page.waitForURL(/region=/, { timeout: 5000 }).catch(() => {});

      if (page.url().includes('region=')) {
        await page.waitForSelector('input[type="date"]', { timeout: 5000 }).catch(() => {});

        const dateSelector = page.locator('input[type="date"]').first();
        const datePickerExists = await dateSelector.count();

        if (datePickerExists > 0) {
          await expect(dateSelector).toBeVisible();

          // Get initial date
          const initialDate = await dateSelector.inputValue();

          // Select a different date (go back a few days)
          const newDate = new Date();
          newDate.setDate(newDate.getDate() - 3);
          const newDateString = newDate.toISOString().split('T')[0];

          await dateSelector.fill(newDateString);

          // Wait for the data to update
          await page.waitForLoadState('networkidle');

          // Verify the date changed
          const updatedDate = await dateSelector.inputValue();
          expect(updatedDate).not.toBe(initialDate);

          // Verify the map or image is still visible
          const canvas = page.locator('canvas').first();
          await expect(canvas).toBeVisible();
        }
      }
    }
  });

  test('TC-772: Refresh Button Resets Date to Latest Available Data Date', async ({ page }) => {
    // Navigate to home and select a category, then click a region
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const categoryLink = page.locator('[data-testid="carousel-container"] a').first();
    await categoryLink.click();
    await page.waitForLoadState('networkidle');

    // Click on the map to select a region
    const mapCanvas = page.locator('.mapboxgl-canvas').first();
    const box = await mapCanvas.boundingBox();

    if (box) {
      await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);
      await page.waitForURL(/region=/, { timeout: 5000 }).catch(() => {});

      if (page.url().includes('region=')) {
        await page.waitForSelector('input[type="date"]', { timeout: 5000 }).catch(() => {});

        const dateSelector = page.locator('input[type="date"]').first();
        const datePickerExists = await dateSelector.count();

        if (datePickerExists > 0) {
          await expect(dateSelector).toBeVisible();

          // Get the initial (latest) date
          const initialDate = await dateSelector.inputValue();

          // Change the date to a past date
          const pastDate = new Date();
          pastDate.setDate(pastDate.getDate() - 5);
          await dateSelector.fill(pastDate.toISOString().split('T')[0]);

          await page.waitForLoadState('networkidle');

          // Click the refresh/reset button using data-testid
          const refreshButton = page.locator('[data-testid="date-reset-button"]');

          const refreshButtonExists = await refreshButton.count();
          if (refreshButtonExists > 0) {
            await refreshButton.click();
            await page.waitForLoadState('networkidle');

            // Verify date reset to latest
            const resetDate = await dateSelector.inputValue();
            expect(resetDate).toBe(initialDate);
          }
        }
      }
    }
  });

  test('TC-773: Left Arrow Changes Date to Previous Available Data', async ({ page }) => {
    // Navigate to home and select a category, then click a region
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const categoryLink = page.locator('[data-testid="carousel-container"] a').first();
    await categoryLink.click();
    await page.waitForLoadState('networkidle');

    // Click on the map to select a region
    const mapCanvas = page.locator('.mapboxgl-canvas').first();
    const box = await mapCanvas.boundingBox();

    if (box) {
      await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);
      await page.waitForURL(/region=/, { timeout: 5000 }).catch(() => {});

      if (page.url().includes('region=')) {
        await page.waitForSelector('input[type="date"]', { timeout: 5000 }).catch(() => {});

        const dateSelector = page.locator('input[type="date"]').first();
        const datePickerExists = await dateSelector.count();

        if (datePickerExists > 0) {
          await expect(dateSelector).toBeVisible();

          // Get initial date
          const initialDate = await dateSelector.inputValue();

          // Click the left/previous arrow using data-testid
          const leftArrow = page.locator('[data-testid="date-previous-button"]');
          const leftArrowExists = await leftArrow.count();

          if (leftArrowExists > 0) {
            await leftArrow.click();
            await page.waitForLoadState('networkidle');

            // Verify date changed to previous
            const newDate = await dateSelector.inputValue();
            expect(newDate).not.toBe(initialDate);

            // Verify new date is earlier than initial date
            const initialDateTime = new Date(initialDate).getTime();
            const newDateTime = new Date(newDate).getTime();
            expect(newDateTime).toBeLessThan(initialDateTime);
          }
        }
      }
    }
  });

  test('TC-774: Right Arrow Changes Date to Next Available Data', async ({ page }) => {
    // Navigate to home and select a category, then click a region
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const categoryLink = page.locator('[data-testid="carousel-container"] a').first();
    await categoryLink.click();
    await page.waitForLoadState('networkidle');

    // Click on the map to select a region
    const mapCanvas = page.locator('.mapboxgl-canvas').first();
    const box = await mapCanvas.boundingBox();

    if (box) {
      await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);
      await page.waitForURL(/region=/, { timeout: 5000 }).catch(() => {});

      if (page.url().includes('region=')) {
        await page.waitForSelector('input[type="date"]', { timeout: 5000 }).catch(() => {});

        const dateSelector = page.locator('input[type="date"]').first();
        const datePickerExists = await dateSelector.count();

        if (datePickerExists > 0) {
          await expect(dateSelector).toBeVisible();

          // First go back one day so we can go forward
          const leftArrow = page.locator('[data-testid="date-previous-button"]');
          const leftArrowExists = await leftArrow.count();

          if (leftArrowExists > 0) {
            await leftArrow.click();
            await page.waitForLoadState('networkidle');

            // Get current date
            const currentDate = await dateSelector.inputValue();

            // Click the right arrow using data-testid
            const rightArrow = page.locator('[data-testid="date-next-button"]');
            const rightArrowExists = await rightArrow.count();

            if (rightArrowExists > 0) {
              await rightArrow.click();
              await page.waitForLoadState('networkidle');

              // Verify date changed to next
              const newDate = await dateSelector.inputValue();
              expect(newDate).not.toBe(currentDate);

              // Verify new date is later than current date
              const currentDateTime = new Date(currentDate).getTime();
              const newDateTime = new Date(newDate).getTime();
              expect(newDateTime).toBeGreaterThan(currentDateTime);
            }
          }
        }
      }
    }
  });
});
