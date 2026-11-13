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

test('preserves product switching in the sidebar', async ({ page }) => {
  await page.goto('/map/gliders');
  const menu = page.getByTestId('map-sidebar-menu');
  await menu.getByRole('menuitem').filter({ hasText: 'Four-hour SST' }).click();
  await expect(page).toHaveURL(/\/map\/four-hour-sst\/sst/);
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
    await page.getByRole('combobox', { name: 'Data mode' }).selectOption('delayed');
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
    await expect(page.getByRole('menuitemradio', { name: 'Slocum' })).toBeFocused();
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
