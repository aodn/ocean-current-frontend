import { readFileSync } from 'node:fs';
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
  await page.route('**/api/v1/gliders/missions?**', async (route) => {
    const query = new URL(route.request().url()).searchParams;
    const mode = query.get('nrt') === 'true' ? 'nrt' : 'delayed';
    const name = `missions-${query.get('q')}-${mode}.json`;
    await route.fulfill({ body: readFileSync(`${fixtureRoot}${name}`), contentType: 'application/json' });
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
    if (new URL(request.url()).pathname.startsWith('/resource/gliders/')) legacyRequests.push(request.url());
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
});

test('keeps the MVP map usable on mobile', async ({ page }) => {
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
