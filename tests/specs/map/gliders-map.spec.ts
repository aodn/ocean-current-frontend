import { readFileSync } from 'node:fs';
import type { GliderYearmapsResponse } from '../../../src/types/gliders';
import { test, expect } from '../../fixtures/base-test';

// A stale DISPLAY can make headless Chromium initialise Vulkan through an unavailable X server.
test.use({
  launchOptions: {
    env: { ...process.env, DISPLAY: '' },
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  },
});

const fixtureRoot = 'src/pages/GlidersMap/fixtures/';

test.beforeEach(async ({ page }) => {
  await page.route('**/resource/api/gliders-yearmaps.json', async (route) => {
    await route.fulfill({ body: readFileSync(`${fixtureRoot}yearmaps.json`), contentType: 'application/json' });
  });
  // A deterministic, empty basemap still exercises the real Mapbox/WebGL GeoJSON layer.
  // Tests verify map rendering without depending on Mapbox tile availability.
  await page.route('https://api.mapbox.com/**', async (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path.includes('/v4/') && path.endsWith('.json')) {
      await route.fulfill({
        json: {
          tilejson: '3.0.0',
          tiles: ['https://api.mapbox.com/test-tiles/{z}/{x}/{y}.pbf'],
          vector_layers: [],
          minzoom: 0,
          maxzoom: 14,
        },
      });
    } else if (path.endsWith('.pbf')) {
      await route.fulfill({ body: Buffer.alloc(0), contentType: 'application/x-protobuf' });
    } else if (path.endsWith('.png')) {
      await route.fulfill({
        body: Buffer.from(
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aF9sAAAAASUVORK5CYII=',
          'base64',
        ),
        contentType: 'image/png',
      });
    } else await route.fulfill({ json: {} });
  });
});

test('shows only the map beside product navigation', async ({ page }) => {
  const legacyRequests: string[] = [];
  page.on('request', (request) => {
    const path = new URL(request.url()).pathname;
    if (path.startsWith('/resource/gliders/') || path.startsWith('/api/v1/gliders/'))
      legacyRequests.push(request.url());
  });
  await page.goto('/map/gliders');
  const map = page.getByRole('region', { name: 'Interactive Australia deployment map' });
  await expect(map).toBeVisible();
  await expect(map).toHaveAccessibleDescription(/12 highlighted deployment areas/);
  expect(legacyRequests).toEqual([]);
  await expect(page.getByTestId('map-sidebar-menu')).toBeVisible();
  await expect(page.getByRole('complementary', { name: 'Gliders options' })).toHaveCount(0);
  await expect(page.getByRole('region', { name: 'Deployment calendar chart' })).toHaveCount(0);
  await expect(page.getByRole('combobox', { name: 'Deployment', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Zoom in', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Zoom in', exact: true }).click();
  const canvas = await map.locator('canvas').boundingBox();
  expect(canvas).not.toBeNull();
  if (canvas) {
    const x = canvas.x + canvas.width / 2;
    const y = canvas.y + canvas.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 80, y + 40, { steps: 10 });
    await page.mouse.up();
  }
  await expect(map).toHaveAccessibleDescription(/12 highlighted deployment areas/);
  expect(legacyRequests).toEqual([]);
});

test('keeps the deployment map usable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/map/gliders');
  const map = page.getByRole('region', { name: 'Interactive Australia deployment map' });
  await expect(map).toBeVisible();
  await expect(map).toHaveAccessibleDescription(/12 highlighted deployment areas/);
  await page.getByRole('button', { name: 'Zoom in', exact: true }).click();
  await expect(page.getByRole('region', { name: 'Deployment calendar chart' })).toHaveCount(0);
});

test('clears Gliders parameters when switching maps in the sidebar', async ({ page }) => {
  await page.goto('/map/gliders?view=map&year=2011&platform=sg&sort=name-desc&missionId=test&window=12d');
  const menu = page.getByTestId('map-sidebar-menu');
  await menu.getByRole('menuitem').filter({ hasText: 'Argo' }).click();
  await expect(page).toHaveURL(/\/map\/argo$/);
  await menu.getByRole('menuitem').filter({ hasText: 'Gliders' }).click();
  await expect(page).toHaveURL(/\/map\/gliders/);
  await expect(page.getByRole('region', { name: 'Interactive Australia deployment map' })).toBeVisible();
});

for (const width of [1280, 390]) {
  test(`switches year and type without refetching at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    let requests = 0;
    await page.route('**/resource/api/gliders-yearmaps.json', async (route) => {
      requests++;
      const data = JSON.parse(readFileSync(`${fixtureRoot}yearmaps.json`, 'utf8')) as GliderYearmapsResponse;
      const seaglider = data.maps.find(({ platform }) => platform === 'sg')!;
      data.maps.push({ ...seaglider, id: '2026_sg_temp_04d', year: 2026 });
      await route.fulfill({ json: data });
    });
    await page.goto('/map/gliders');
    const year = page.getByRole('combobox', { name: 'Year', exact: true });
    const type = page.getByRole('button', { name: 'Glider type', exact: true });
    const map = page.getByRole('region', { name: 'Interactive Australia deployment map' });
    await expect(year).toHaveValue('2026');
    await expect(type).toHaveText('Slocum');
    await type.click();
    await page.getByRole('menuitemradio', { name: 'Seaglider' }).getByText('Seaglider').click();
    await expect(type).toHaveText('Seaglider');
    await expect(map).toHaveAccessibleDescription(/1 highlighted deployment areas on map 2026_sg_temp_04d/);
    await type.click();
    await page.getByRole('menuitemradio', { name: 'Slocum' }).click({ position: { x: 24, y: 24 } });
    await expect(type).toHaveText('Slocum');
    await year.focus();
    await year.press('ArrowDown');
    await year.press('Tab');
    await expect(year).toHaveValue('2011');
    await type.focus();
    await year.focus();
    await year.press('Home');
    await year.press('Tab');
    await expect(year).toHaveValue('2026');
    await type.focus();
    await type.press('Enter');
    await expect(page.getByRole('menuitemradio', { name: 'Seaglider' })).toBeFocused();
    await page.screenshot({ path: `/tmp/gliders-type-menu-${width}.png`, fullPage: true });
    await page.getByRole('menuitemradio', { name: 'Seaglider' }).press('Escape');
    await expect(type).toBeFocused();
    await expect(page.getByRole('menuitemradio', { name: 'Slocum', exact: true })).toHaveCount(0);
    await type.press('Enter');
    await page.getByRole('menuitemradio', { name: 'Seaglider' }).press('Home');
    await page.getByRole('menuitemradio', { name: 'Slocum' }).press('Enter');
    await expect(type).toHaveText('Slocum');
    await type.press('Enter');
    await page.getByRole('menuitemradio', { name: 'Slocum' }).press('End');
    await page.getByRole('menuitemradio', { name: 'Seaglider' }).press('Enter');
    await expect(type).toHaveText('Seaglider');
    await expect(map).toHaveAccessibleDescription(/1 highlighted deployment areas on map 2026_sg_temp_04d/);
    await year.selectOption('2008');
    await expect(type).toHaveText('Slocum');
    await expect(type).toBeDisabled();
    await expect(type.locator('svg')).toHaveCount(1);
    await expect(map).toHaveAccessibleDescription(/3 highlighted deployment areas on map 2008_sl_temp_04d/);
    for (const control of [year, type]) {
      const bounds = await control.boundingBox();
      expect(bounds).not.toBeNull();
      expect((await (control === year ? control.locator('../..') : control.locator('..')).boundingBox())!.height).toBe(
        44,
      );
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      expect(bounds!.y + bounds!.height).toBeLessThanOrEqual((await map.boundingBox())!.y);
    }
    await expect(page.getByRole('button', { name: 'Previous year', exact: true })).toBeDisabled();
    await page.getByRole('button', { name: 'Next year', exact: true }).click();
    await expect(year).toHaveValue('2011');
    await page.getByRole('button', { name: 'Previous year', exact: true }).click();
    await expect(year).toHaveValue('2008');
    await page.getByRole('button', { name: 'Reset to current year', exact: true }).click();
    await expect(year).toHaveValue('2026');
    await expect(page.getByRole('button', { name: 'Next year', exact: true })).toBeDisabled();
    await page.screenshot({ path: `/tmp/gliders-toolbar-${width}.png`, fullPage: true });
    expect(requests).toBe(1);
  });
}

for (const width of [1280, 390]) {
  test(`switches views and returns from an unbounded mission to the table at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    const mission = {
      id: 'Perth20110626_1@5.',
      mission_name: 'Perth20110626_1',
      start_date: '2011-06-26',
      glider_id: 'SG514',
      end_date: null,
      visualisations: {
        latest_images: { '4d': '/gliders/table-test.gif', '12d': '/gliders/table-test.gif', '30d': null },
        details: ['4', '12', '30'].map((label) => ({ label, url: `/gliders/table_${label}d/latest.html` })),
      },
    };
    let catalogueRequests = 0;
    await page.route('**/api/v1/gliders/missions?*', async (route) => {
      if (!new URL(route.request().url()).searchParams.has('q')) catalogueRequests++;
      const historical = {
        id: 'Bicheno20100813@5.',
        mission_name: 'Bicheno20100813',
        start_date: '2010-08-13',
        end_date: '2011-01-02',
        glider_id: 'SG519',
        visualisations: {},
      };
      const longMission = {
        id: 'long-mission',
        mission_name: 'Perth_ContinentalShelf_ExtendedOffshoreSurvey20110101',
        start_date: '2011-01-01',
        glider_id: 'SG514',
        visualisations: {},
      };
      await route.fulfill({ json: { missions: [mission, historical, longMission], total: 3 } });
    });
    await page.route('**/api/v1/gliders/missions/*', async (route) => {
      await route.fulfill({ json: mission });
    });
    await page.route('**/resource/gliders/table-test.gif', async (route) => {
      await route.fulfill({
        body: Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
        contentType: 'image/gif',
      });
    });
    await page.goto('/map/gliders');
    const year = page.getByRole('combobox', { name: 'Year', exact: true });
    const type = page.getByRole('button', { name: 'Glider type', exact: true });
    await expect(page.getByRole('button', { name: 'Map view', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await year.selectOption('2011');
    await page.getByRole('button', { name: 'Table view', exact: true }).click();
    const table = page.getByRole('table');
    await expect(table).toBeVisible();
    await expect(table.getByRole('row')).toHaveCount(4);
    await expect(table.getByRole('cell', { name: '26 Jun 2011 – —' })).toBeVisible();
    const initialCatalogueRequests = catalogueRequests;
    await expect(year).toHaveValue('2011');
    await expect(type).toHaveText('Seaglider');
    await page.getByRole('button', { name: 'Map view', exact: true }).click();
    await expect(
      page.getByRole('region', { name: 'Interactive Australia deployment map' }),
    ).toHaveAccessibleDescription(/1 highlighted deployment areas/);
    await expect(year).toHaveValue('2011');
    await page.getByRole('button', { name: 'Table view', exact: true }).click();
    for (const control of [year, type, page.getByRole('button', { name: 'Table view', exact: true })]) {
      await expect(control).toBeVisible();
      const bounds = (await control.boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
    }
    await expect(page.getByText('3 missions', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.screenshot({ path: `/tmp/gliders-table-${width}.png`, fullPage: true });
    const scroller = page.getByRole('region', { name: 'Gliders deployment table', exact: true });
    await scroller.evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
    });
    await expect(table.getByRole('button', { name: mission.mission_name, exact: true })).toBeInViewport();
    await expect(table.getByRole('button', { name: 'View 30-day mission image', exact: true })).toBeDisabled();
    await page.screenshot({ path: `/tmp/gliders-table-scrolled-${width}.png`, fullPage: true });
    await page.getByRole('button', { name: 'Sort deployments' }).click();
    await page.getByRole('menuitem', { name: 'Mission name (A–Z)', exact: true }).click();
    const missionButton = table.getByRole('button', { name: mission.mission_name, exact: true });
    await missionButton.focus();
    await missionButton.press('Enter');
    await expect(page.getByRole('img', { name: `${mission.mission_name} 4d mission profile` })).toBeVisible();
    await page.getByRole('button', { name: '12 days', exact: true }).click();
    await expect(page.getByRole('img', { name: `${mission.mission_name} 12d mission profile` })).toBeVisible();
    await page.goBack();
    await expect(table).toBeVisible();
    await expect(year).toHaveValue('2011');
    await expect(type).toHaveText('Seaglider');
    await expect(page.getByRole('button', { name: 'Table view', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('button', { name: 'Sort deployments' })).toHaveText('Mission name (A–Z)');
    expect(catalogueRequests).toBe(initialCatalogueRequests);
  });

  test(`reuses the product sidebar and switches products from a Gliders image at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.route('**/api/v1/gliders/missions/*', async (route) => {
      await route.fulfill({
        json: {
          id: 'TwoRocks20261028_nrt@5.',
          mission_name: 'TwoRocks20261028_nrt',
          visualisations: { latest_images: { '4d': '/gliders/test.gif' } },
        },
      });
    });
    await page.route('**/resource/gliders/test.gif', async (route) => {
      await route.fulfill({
        body: Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
        contentType: 'image/gif',
      });
    });
    await page.goto('/product/gliders?missionId=TwoRocks20261028_nrt%405.&window=4d');
    await expect(page.getByRole('heading', { name: 'TwoRocks20261028_nrt' })).toBeVisible();
    const dropdown = page.getByTestId('product-dropdown-toggle').filter({ visible: true });
    await expect(dropdown).toHaveText('Gliders');
    if (width >= 768) {
      const map = page.getByRole('region', { name: 'Interactive Australia deployment map' });
      await expect(map).toBeVisible();
      expect((await map.boundingBox())!.height).toBe(240);
      expect(Math.round((await map.boundingBox())!.width)).toBe(Math.round((await dropdown.boundingBox())!.width));
      await page.getByRole('button', { name: 'Toggle sidebar' }).click();
      await expect(dropdown).not.toBeInViewport();
      await page.getByRole('button', { name: 'Toggle sidebar' }).click();
      await expect(dropdown).toBeInViewport();
    }
    await dropdown.click();
    await page.getByRole('menuitem', { name: 'Four-hour SST', exact: true }).click();
    await expect(page).toHaveURL(/\/product\/four-hour-sst\/sst/);
    expect(new URL(page.url()).searchParams.has('missionId')).toBe(false);
    expect(new URL(page.url()).searchParams.has('window')).toBe(false);
  });
}
