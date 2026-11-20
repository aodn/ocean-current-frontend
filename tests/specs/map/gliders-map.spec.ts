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
  await page.route('**/resource/api/gliders/gliders-yearmaps.json', async (route) => {
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

test('returns from a map deployment to the same Gliders map selection', async ({ page, productPage }) => {
  await page.setViewportSize({ width: 1280, height: 844 });
  const data = JSON.parse(readFileSync(`${fixtureRoot}yearmaps.json`, 'utf8')) as GliderYearmapsResponse;
  const map = data.maps.find(({ id }) => id === '2026_sl_temp_04d_nrt')!;
  const deployment = map.deployments.find(({ mission_name }) => mission_name === 'TwoRocks20261028_nrt')!;
  // Put the single fixture deployment around the initial map centre so it can be clicked consistently.
  map.deployments = [{ ...deployment, bbox: [137, -31, 143, -26] }];
  const mission = { id: `${deployment.mission_name}@5.`, mission_name: deployment.mission_name, visualisations: {} };
  await page.route('**/resource/api/gliders/gliders-yearmaps.json', (route) => route.fulfill({ json: data }));
  await page.route('**/api/v1/gliders/missions?*', (route) =>
    route.fulfill({ json: { missions: [mission], total: 1 } }),
  );
  await page.route('**/api/v1/gliders/missions/*', (route) => route.fulfill({ json: mission }));

  const mapUrl = '/map/gliders?view=map&year=2026&platform=sl&mode=nrt';
  await page.goto(mapUrl);
  const canvas = page.getByRole('region', { name: 'Interactive Australia deployment map' }).locator('canvas');
  await expect
    .poll(async () => {
      await canvas.hover({ position: { x: 10, y: 10 } });
      await canvas.hover();
      return canvas.evaluate((element) => element.style.cursor);
    })
    .toBe('pointer');
  await canvas.click();
  await expect(page.getByRole('heading', { name: mission.mission_name, exact: true })).toBeVisible();
  await expect(productPage.backToDeployments).toHaveAttribute('href', mapUrl);
  await productPage.backToDeployments.click();
  await expect(page).toHaveURL(mapUrl);
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
    await page.route('**/api/v1/gliders/missions?*', (route) => route.fulfill({ json: { missions: [], total: 0 } }));
    await page.route('**/resource/api/gliders/gliders-yearmaps.json', async (route) => {
      requests++;
      const data = JSON.parse(readFileSync(`${fixtureRoot}yearmaps.json`, 'utf8')) as GliderYearmapsResponse;
      const seaglider = data.maps.find(({ platform }) => platform === 'sg')!;
      data.maps.push({ ...seaglider, id: '2026_sg_temp_04d', year: 2026 });
      await route.fulfill({ json: data });
    });
    await page.goto('/map/gliders');
    await page.getByRole('button', { name: 'Data mode' }).click();
    await page.getByRole('menuitemradio', { name: 'Delayed', exact: true }).click();
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
      await control.scrollIntoViewIfNeeded();
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
    expect(requests).toBe(1);
  });
}

for (const width of [1280, 390]) {
  test(`plays the selected mission video and returns to its profile at ${width}px`, async ({ page, productPage }) => {
    await page.setViewportSize({ width, height: 844 });
    const mission = {
      id: 'TwoRocks20261028_nrt@5.',
      mission_name: 'TwoRocks20261028_nrt',
      visualisations: {
        latest_images: { '4d': '/gliders/video-test.gif', '12d': '/gliders/video-test.gif' },
        animations: [{ label: '4', url: 'https://oceancurrent.aodn.org.au/gliders/video-test.mp4' }],
      },
    };
    await page.route('**/api/v1/gliders/missions/*', (route) => route.fulfill({ json: mission }));
    await page.route('**/resource/gliders/video-test.gif', (route) =>
      route.fulfill({
        body: Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
        contentType: 'image/gif',
      }),
    );
    // A one-second, solid-colour MP4 exercises the browser's real media player.
    await page.route('**/resource/gliders/video-test.mp4', (route) =>
      route.fulfill({ path: 'tests/mocks/data/glider-animation.mp4', contentType: 'video/mp4' }),
    );
    await page.goto('/product/gliders?missionId=TwoRocks20261028_nrt%405.&window=4d');
    const toggle = page.getByRole('button', { name: 'Toggle video' });
    await expect(toggle).toBeEnabled();
    await toggle.click();
    const video = page.getByLabel('TwoRocks20261028_nrt 4d mission video');
    await expect(video).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect
      .poll(() => video.evaluate((element: HTMLVideoElement) => element.readyState))
      .toBeGreaterThanOrEqual(2);
    await video.evaluate((element: HTMLVideoElement) => element.play());
    await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(0);
    await page.screenshot({ path: `/tmp/gliders-mission-video-${width}.png`, fullPage: true });
    await toggle.click();
    await expect(video).toHaveCount(0);
    await expect(page.getByRole('img', { name: 'TwoRocks20261028_nrt 4d mission profile' })).toBeVisible();
    await expect(page).toHaveURL(/window=4d$/);
    await page.getByRole('button', { name: '12 days', exact: true }).click();
    await expect(toggle).toBeDisabled();
    await expect(productPage.backToDeployments).toHaveAttribute('href', '/map/gliders');
    await productPage.backToDeployments.click();
    await expect(page).toHaveURL('/map/gliders');
  });

  test(`opens a T-S diagram from the table and returns to the filtered table at ${width}px`, async ({
    page,
    productPage,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    const tsUrl = 'https://oceancurrent.aodn.org.au/gliders/missionTS';
    const withDiagram = {
      id: 'Perth20110626_1@5.',
      mission_name: 'Perth20110626_1',
      start_date: '2011-06-26',
      glider_id: 'SG514',
      temperature_salinity_url: `${tsUrl}/sg_Perth20110626_1.html`,
      visualisations: { temperature_salinity_image: '/gliders/missionTS/sg_Perth20110626_1.gif' },
    };
    const broken = {
      id: 'Bicheno20100813@5.',
      mission_name: 'Bicheno20100813',
      start_date: '2010-08-13',
      end_date: '2011-01-02',
      glider_id: 'SG519',
      temperature_salinity_url: `${tsUrl}/sg_Bicheno20100813.html`,
      visualisations: { temperature_salinity_image: '/gliders/missionTS/sg_Bicheno20100813.gif' },
    };
    const missions = [withDiagram, broken];
    await page.route('**/api/v1/gliders/missions?*', (route) => route.fulfill({ json: { missions, total: 2 } }));
    await page.route('**/api/v1/gliders/missions/*', async (route) => {
      const id = decodeURIComponent(new URL(route.request().url()).pathname.split('/').pop()!);
      await route.fulfill({ json: missions.find((mission) => mission.id === id) });
    });
    await page.route('**/resource/gliders/missionTS/sg_Perth20110626_1.gif', (route) =>
      route.fulfill({
        body: Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
        contentType: 'image/gif',
      }),
    );
    await page.route('**/resource/gliders/missionTS/sg_Bicheno20100813.gif', (route) => route.fulfill({ status: 404 }));

    await page.goto('/map/gliders?view=table&year=2011&platform=sg&sort=name-desc&mode=delayed');
    const table = page.getByRole('table');
    await expect(table.getByRole('row')).toHaveCount(3);
    await table.getByRole('button', { name: 'View Perth20110626_1 temperature–salinity diagram' }).click();
    await expect(page).toHaveURL(/\/product\/gliders\?missionId=Perth20110626_1%405\.&view=ts$/);
    await expect(page.getByRole('heading', { name: 'Perth20110626_1', exact: true })).toBeVisible();
    const diagram = page.getByRole('img', { name: 'Perth20110626_1 temperature–salinity diagram' });
    await expect(diagram).toHaveAttribute('src', '/resource/gliders/missionTS/sg_Perth20110626_1.gif');
    await expect.poll(() => diagram.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBe(1);
    await expect(page.getByRole('group', { name: 'Time window' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Previous date' })).toHaveCount(0);

    await expect(productPage.backToDeployments).toHaveCount(1);
    if (width >= 768) {
      await page.getByRole('button', { name: 'Toggle sidebar' }).click();
      await expect(productPage.backToDeployments).toHaveCount(1);
    }
    await productPage.backToDeployments.focus();
    await productPage.backToDeployments.press('Enter');
    await expect(page).toHaveURL(/\/map\/gliders\?/);
    const params = new URL(page.url()).searchParams;
    expect(Object.fromEntries(params)).toEqual({
      view: 'table',
      year: '2011',
      platform: 'sg',
      sort: 'name-desc',
      mode: 'delayed',
    });
    await expect(page.getByRole('button', { name: 'Browse deployments' })).toHaveText('Mission name (Z–A)');
    await expect(page.getByRole('combobox', { name: 'Year', exact: true })).toHaveValue('2011');

    await table.getByRole('button', { name: 'View Bicheno20100813 temperature–salinity diagram' }).click();
    await expect(page.getByText('Temperature–salinity diagram unavailable')).toBeVisible();
    await expect(productPage.backToDeployments).toBeVisible();
  });
}

for (const width of [1280, 390]) {
  test(`switches views and returns from an unbounded mission to the table at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    const mission = {
      id: 'Perth20110626_1@5.',
      mission_name: 'Perth20110626_1',
      is_nrt: false,
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
      if (!new URL(route.request().url()).searchParams.has('q')) {
        expect(new URL(route.request().url()).searchParams.get('order')).toBe('distance_alongshore_to_darwin');
        catalogueRequests++;
      }
      const historical = {
        id: 'Bicheno20100813@5.',
        mission_name: 'Bicheno20100813',
        is_nrt: false,
        start_date: '2010-08-13',
        end_date: '2011-01-02',
        glider_id: 'SG519',
        visualisations: {},
      };
      const longMission = {
        id: 'long-mission',
        mission_name: 'Perth_ContinentalShelf_ExtendedOffshoreSurvey20110101',
        is_nrt: false,
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
    await page.getByRole('button', { name: 'Data mode' }).click();
    await page.getByRole('menuitemradio', { name: 'Delayed', exact: true }).click();
    const year = page.getByRole('combobox', { name: 'Year', exact: true });
    const type = page.getByRole('button', { name: 'Glider type', exact: true });
    await expect(page.getByRole('switch', { name: 'Table view', exact: true })).toHaveAttribute(
      'aria-checked',
      'false',
    );
    await year.selectOption('2011');
    await page.getByRole('switch', { name: 'Table view', exact: true }).click();
    const table = page.getByRole('table');
    await expect(table).toBeVisible();
    await expect(table.getByRole('row')).toHaveCount(4);
    await expect(table.getByRole('cell', { name: '26 Jun 2011 – —' })).toBeVisible();
    const initialCatalogueRequests = catalogueRequests;
    await expect(year).toHaveValue('2011');
    await expect(type).toHaveText('Seaglider');
    await page.getByRole('switch', { name: 'Table view', exact: true }).click();
    await expect(
      page.getByRole('region', { name: 'Interactive Australia deployment map' }),
    ).toHaveAccessibleDescription(/1 highlighted deployment areas/);
    await expect(year).toHaveValue('2011');
    await page.getByRole('switch', { name: 'Table view', exact: true }).click();
    for (const control of [year, type, page.getByRole('switch', { name: 'Table view', exact: true })]) {
      await expect(control).toBeVisible();
      await control.scrollIntoViewIfNeeded();
      const bounds = (await control.boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
    }
    await expect(page.getByText('3 missions', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const scroller = page.getByRole('region', { name: 'Gliders deployment table', exact: true });
    await scroller.evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
    });
    await expect(table.getByRole('button', { name: mission.mission_name, exact: true })).toBeInViewport();
    await expect(table.getByRole('button', { name: 'View 30-day mission image', exact: true })).toBeDisabled();
    await page.getByRole('button', { name: 'Browse deployments' }).click();
    const labelPositions = await page
      .getByRole('menu')
      .filter({ has: page.getByRole('menuitem', { name: 'Alongshore to Darwin', exact: true }) })
      .getByRole('menuitem')
      .evaluateAll((items) => items.map((item) => item.querySelector('span')!.getBoundingClientRect().left));
    for (const position of labelPositions) expect(position).toBeCloseTo(labelPositions[0], 0);
    await page.getByRole('menuitem', { name: 'Alongshore to Darwin', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Browse deployments' }).locator('span')).toHaveCSS(
      'white-space',
      'nowrap',
    );
    await expect(page.getByRole('button', { name: 'Browse deployments' }).locator('span')).toHaveCSS(
      'text-overflow',
      'ellipsis',
    );
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
    await expect(page.getByRole('switch', { name: 'Table view', exact: true })).toHaveAttribute('aria-checked', 'true');
    await expect(page.getByRole('button', { name: 'Browse deployments' })).toHaveText('Alongshore to Darwin');
    expect(catalogueRequests).toBe(initialCatalogueRequests);
    await expect(table.getByRole('row').nth(2)).toContainText('Bicheno20100813');
    await expect(page).toHaveURL(/sort=distance-alongshore/);
    await page.reload();
    await expect(table).toBeVisible();
    await expect(year).toHaveValue('2011');
    await expect(type).toHaveText('Seaglider');
    await expect(page.getByRole('button', { name: 'Browse deployments' })).toHaveText('Alongshore to Darwin');
    await expect(table.getByRole('row').nth(2)).toContainText('Bicheno20100813');
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

for (const width of [1280, 390]) {
  test(`navigates mission image dates across gaps at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    const frames = [
      { date: '2026-10-01T00:00:00', url: '/gliders/history/2026100100.gif' },
      { date: '2026-10-01T12:00:00', url: '/gliders/history/2026100112.gif' },
      { date: '2026-10-04T00:00:00', url: '/gliders/history/2026100400.gif' },
    ];
    await page.route('**/api/v1/gliders/missions/*', (route) =>
      route.fulfill({
        json: {
          id: 'Perth20110626_1@5.',
          mission_name: 'Perth20110626_1',
          visualisations: { latest_images: { '4d': frames[2].url } },
          image_history: { '4d': frames },
        },
      }),
    );
    await page.route('**/resource/gliders/history/*.gif', (route) =>
      route.fulfill({
        body: Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
        contentType: 'image/gif',
      }),
    );
    await page.goto('/product/gliders?missionId=Perth20110626_1%405.&window=4d');
    const image = page.getByRole('img', { name: 'Perth20110626_1 4d mission profile' });
    await expect(image).toHaveAttribute('src', `/resource${frames[2].url}`);
    await expect(page.getByTestId('date-next-button')).toBeDisabled();
    await page.getByTestId('date-previous-button').click();
    await expect(image).toHaveAttribute('src', `/resource${frames[1].url}`);
    await expect(page.getByTestId('selected-date')).toHaveText('01 Oct 2026 12:00');
    await page.getByTestId('date-previous-button').click();
    await expect(page.getByTestId('date-previous-button')).toBeDisabled();
    await expect(image).toHaveAttribute('src', `/resource${frames[0].url}`);
    await page.getByLabel('calendar icon').click();
    await expect(page.getByRole('gridcell', { name: /October 2nd/ })).toHaveAttribute('aria-disabled', 'true');
    await page.getByRole('gridcell', { name: /October 4th/ }).click();
    await expect(image).toHaveAttribute('src', `/resource${frames[2].url}`);
    await page.reload();
    await expect(image).toHaveAttribute('src', `/resource${frames[2].url}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}

for (const width of [1280, 390]) {
  test(`retains the mission heading at ${width}px`, async ({ page }, testInfo) => {
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
    const heading = page.getByRole('heading', { level: 1, name: 'TwoRocks20261028_nrt' });
    await expect(heading).toBeVisible();
    if (width >= 768) {
      await page.getByRole('button', { name: 'Toggle sidebar' }).click();
      await expect(heading).toBeVisible();
      await page.getByRole('button', { name: 'Toggle sidebar' }).click();
    }
    await testInfo.attach('gliders-mission-heading', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
}

for (const width of [1280, 390]) {
  test(`preserves data mode across map, table, and saved URLs at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 844 });
    const missions = [
      {
        id: 'realtime',
        mission_name: 'RealtimeMission',
        is_nrt: true,
        start_date: '2026-01-01',
        glider_id: 'SL1',
        visualisations: {},
      },
      {
        id: 'delayed',
        mission_name: 'DelayedMission',
        is_nrt: false,
        start_date: '2026-01-01',
        glider_id: 'SL1',
        visualisations: {},
      },
    ];
    await page.route('**/api/v1/gliders/missions?*', (route) =>
      route.fulfill({ json: { missions, total: missions.length } }),
    );
    await page.goto('/map/gliders');
    const mode = page.getByRole('button', { name: 'Data mode' });
    const view = page.getByRole('switch', { name: 'Table view', exact: true });
    const map = page.getByRole('region', { name: 'Interactive Australia deployment map' });
    await expect(mode).toHaveText('NRT');
    await expect(map).toHaveAccessibleDescription(/12 highlighted deployment areas/);
    await mode.press('Enter');
    await expect(page.getByRole('menuitemradio', { name: 'NRT', exact: true })).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(map).toHaveAccessibleDescription(/2 highlighted deployment areas on map 2026_sl_temp_04d\./);
    await view.click();
    await expect(page.getByRole('button', { name: 'DelayedMission', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'RealtimeMission', exact: true })).toHaveCount(0);
    await page.reload();
    await expect(mode).toHaveText('Delayed');
    await expect(page.getByRole('button', { name: 'DelayedMission', exact: true })).toBeVisible();
    await mode.click();
    await page.getByRole('menuitemradio', { name: 'NRT', exact: true }).click();
    await expect(page.getByRole('button', { name: 'RealtimeMission', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'DelayedMission', exact: true })).toHaveCount(0);
    await testInfo.attach(`gliders-data-mode-${width}`, {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
}

for (const width of [1280, 390]) {
  test(`browses the complete T-S index at ${width}px`, async ({ page, productPage }, testInfo) => {
    await page.setViewportSize({ width, height: 844 });
    const mission = {
      id: 'TwoRocks20261028_nrt@5.',
      mission_name: 'TwoRocks20261028_nrt',
      start_date: '2026-10-28',
      is_nrt: true,
      glider_id: 'SL248',
      temperature_salinity_url: '/gliders/missionTS/sl_TwoRocks20261028_nrt.html',
      visualisations: {
        temperature_salinity_image: '/gliders/missionTS/current.gif',
        latest_images: { '4d': '/gliders/missionTS/current.gif' },
      },
    };
    const otherMission = { ...mission, id: 'Ceduna20260924_nrt@5.', mission_name: 'Ceduna20260924_nrt' };
    const diagrams = [
      { id: 'sg_Historical20010101', image_url: '/gliders/missionTS/historical.gif', mission_ids: [] },
      { id: 'sl_Ceduna20260924_nrt', image_url: '/gliders/missionTS/current.gif', mission_ids: [otherMission.id] },
      { id: 'sl_TwoRocks20261028_nrt', image_url: '/gliders/missionTS/current.gif', mission_ids: [mission.id] },
    ];
    await page.route('**/api/v1/gliders/ts-diagrams', (route) => route.fulfill({ json: { diagrams } }));
    await page.route('**/api/v1/gliders/missions?*', (route) =>
      route.fulfill({ json: { missions: [mission], total: 1 } }),
    );
    await page.route('**/api/v1/gliders/missions/*', (route) => {
      const id = decodeURIComponent(new URL(route.request().url()).pathname.split('/').pop()!);
      return route.fulfill({ json: id === otherMission.id ? otherMission : mission });
    });
    await page.route('**/resource/gliders/missionTS/*.gif', (route) =>
      route.fulfill({
        body: Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
        contentType: 'image/gif',
      }),
    );
    await page.goto('/map/gliders?view=table&year=2026&platform=sl&mode=nrt');
    await page.getByRole('button', { name: `View ${mission.mission_name} temperature–salinity diagram` }).click();
    const selectedMission = page.getByRole('group', { name: 'Selected mission' });
    const minimap = page.getByRole('region', { name: 'Interactive Australia deployment map' });
    await expect(selectedMission).toHaveText(`Selected mission${mission.mission_name}`);
    if (width >= 768) {
      await expect(minimap).toHaveAccessibleDescription(/Selected deployment: TwoRocks20261028_nrt/);
    }
    await expect(productPage.tsNext).toBeVisible();
    await productPage.tsNext.click();
    await expect(page).toHaveURL(/diagramId=sg_Historical20010101/);
    expect(new URL(page.url()).searchParams.has('missionId')).toBe(false);
    await expect(page.getByRole('img', { name: /Historical20010101 temperature/ })).toBeVisible();
    await expect(selectedMission).toHaveCount(0);
    await page.reload();
    await expect(productPage.tsPrevious).toBeVisible();
    await productPage.tsPrevious.click();
    await expect(page).toHaveURL(/diagramId=sl_TwoRocks20261028_nrt/);
    await productPage.tsPrevious.click();
    await expect(selectedMission).toHaveText(`Selected mission${otherMission.mission_name}`);
    if (width >= 768) {
      await expect(minimap).toHaveAccessibleDescription(/Selected deployment: Ceduna20260924_nrt/);
    }
    await productPage.tsIndex.click();
    await expect(page.getByRole('heading', { name: 'T-S diagram index' })).toBeVisible();
    await page.getByRole('button', { name: 'Glider type', exact: true }).click();
    await page.getByRole('menuitemradio', { name: 'Seaglider', exact: true }).click();
    await page.getByRole('button', { name: 'Data mode', exact: true }).click();
    await page.getByRole('menuitemradio', { name: 'Delayed', exact: true }).click();
    await page.getByLabel('From', { exact: true }).fill('2001-01-01');
    await page.getByLabel('To', { exact: true }).fill('2001-01-01');
    await expect(page.getByRole('rowheader')).toHaveText(['Historical20010101']);
    const filteredUrl = page.url();
    await page.reload();
    await expect(page.getByLabel('From', { exact: true })).toHaveValue('2001-01-01');
    await expect(page.getByLabel('To', { exact: true })).toHaveValue('2001-01-01');
    if (width === 1280) {
      const heading = await page.getByRole('heading', { name: 'T-S diagram index' }).boundingBox();
      const from = await page.getByLabel('From', { exact: true }).boundingBox();
      expect(heading).not.toBeNull();
      expect(from).not.toBeNull();
      expect(from!.x).toBeGreaterThan(heading!.x + heading!.width);
      expect(from!.y).toBeLessThan(heading!.y + heading!.height);
      expect(from!.y + from!.height).toBeGreaterThan(heading!.y);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const historicalDiagram = page.getByRole('link', {
      name: 'View sg_Historical20010101 temperature–salinity diagram',
    });
    await historicalDiagram.click();
    await page.goBack();
    await expect(page).toHaveURL(filteredUrl);
    await historicalDiagram.click();
    await productPage.tsNext.click();
    await expect(page).toHaveURL(/diagramId=sl_Ceduna20260924_nrt/);
    await productPage.tsIndex.click();
    await expect(page).toHaveURL(filteredUrl);
    await expect(page.getByRole('rowheader')).toHaveText(['Historical20010101']);
    await page.getByLabel('To', { exact: true }).fill('2001-01-02');
    await page.getByLabel('From', { exact: true }).fill('2001-01-02');
    await expect(page.getByText('No T-S diagrams match the selected filters.')).toBeVisible();
    await page.getByRole('button', { name: 'Clear dates' }).click();
    await expect(page.getByLabel('From', { exact: true })).toHaveValue('');
    await expect(page.getByLabel('To', { exact: true })).toHaveValue('');
    await expect(page.getByRole('rowheader')).toHaveText(['Historical20010101']);
    await historicalDiagram.click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await testInfo.attach(`ts-navigation-${width}`, {
      body: await page.screenshot({ path: testInfo.outputPath(`ts-navigation-${width}.png`), fullPage: true }),
      contentType: 'image/png',
    });
    await productPage.backToDeployments.click();
    await expect(page).toHaveURL(/view=table.*year=2026/);
    await page.goto('/product/gliders?view=ts&diagramId=sg_Historical20010101');
    await expect(page.getByRole('img', { name: /Historical20010101 temperature/ })).toBeVisible();
    await expect(productPage.backToDeployments).toHaveAttribute('href', '/map/gliders');
  });
}

for (const width of [1280, 390]) {
  test(`browses event membership in published order at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    const missions = ['First', 'Second', 'Excluded'].map((name, index) => ({
      id: `${name}@5.01`,
      mission_name: name,
      start_date: `2026-01-0${index + 1}`,
      glider_id: 'SL123',
      is_nrt: false,
      visualisations: {},
    }));
    let eventRequests = 0;
    await page.route('**/api/v1/gliders/missions?*', async (route) => {
      const event = new URL(route.request().url()).searchParams.get('order') === 'event_based_sampling';
      if (event) eventRequests++;
      const rows = event ? [missions[1], missions[0]] : missions;
      await route.fulfill({ json: { missions: rows, total: rows.length } });
    });
    await page.goto('/map/gliders?view=table&year=2026&platform=sl&mode=delayed');
    await expect(page.getByRole('button', { name: 'Excluded', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Browse deployments' }).click();
    await page.getByRole('menuitem', { name: 'Event-based sampling', exact: true }).click();
    const rows = page.getByRole('table').getByRole('row');
    await expect(rows).toHaveCount(3);
    await expect(rows.nth(1)).toContainText('Second');
    await expect(rows.nth(2)).toContainText('First');
    await expect(page.getByRole('button', { name: 'Excluded', exact: true })).toHaveCount(0);
    const mode = page.getByRole('button', { name: 'Data mode' });
    await mode.click();
    await page.getByRole('menuitemradio', { name: 'NRT', exact: true }).click();
    await expect(page.getByText(/No event-based sampling deployments match/)).toBeVisible();
    await mode.click();
    await page.getByRole('menuitemradio', { name: 'Delayed', exact: true }).click();
    await expect(rows).toHaveCount(3);
    expect(eventRequests).toBe(1);
    await page.reload();
    await expect(rows.nth(1)).toContainText('Second');
    await expect(page.getByRole('button', { name: 'Browse deployments' })).toHaveText('Event-based sampling');
  });
}

for (const [width, view] of [
  [1280, 'map'],
  [390, 'table'],
] as const) {
  test(`opens Gliders notes from the ${view} and preserves the deployment filters`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.route('**/api/v1/gliders/missions?*', (route) => route.fulfill({ json: { missions: [], total: 0 } }));
    const deployments = `/map/gliders?view=${view}&year=2011&platform=sg&mode=delayed&sort=name-desc`;
    await page.goto(deployments);
    const controls = page.getByRole('group', { name: 'Gliders controls' });
    const notes = controls.getByRole('link', { name: 'Notes & resources' });
    await expect(controls.getByRole('combobox', { name: 'Year' })).toBeVisible();
    const sameRow = await controls.evaluate((bar) => {
      const centers = Array.from(bar.children, (child) => {
        const { top, height } = child.getBoundingClientRect();
        return top + height / 2;
      });
      return Math.max(...centers) - Math.min(...centers) < 1;
    });
    expect(sameRow).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    if (width === 1280) {
      await expect(notes).toBeInViewport({ ratio: 1 });
      const rightGap = await controls.evaluate(
        (bar) => bar.getBoundingClientRect().right - bar.lastElementChild!.getBoundingClientRect().right,
      );
      expect(rightGap).toBeLessThanOrEqual(4);
    }
    await notes.click();
    await expect(page).toHaveURL(/\/about\/gliders$/);
    await expect(page.getByRole('heading', { name: 'Gliders notes and resources' })).toBeVisible();
    const history = page.locator('details').filter({ hasText: 'Revision history' });
    await expect(history).not.toHaveAttribute('open');
    await history.getByText('Revision history', { exact: true }).click();
    await expect(history.getByText('2025', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Historical data notes' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'IMOS Ocean Gliders' })).toHaveAttribute(
      'href',
      'https://imos.org.au/facility/ocean-gliders',
    );
    await expect(page.getByRole('link', { name: 'AODN THREDDS glider data catalogue' })).toHaveAttribute(
      'href',
      'https://thredds.aodn.org.au/thredds/catalog/IMOS/ANFOG/catalog.html',
    );
    await expect(page.getByRole('link', { name: 'Event Based Sampling programme' })).toHaveAttribute(
      'href',
      'https://imos.org.au/facility/ocean-gliders/event-based-sampling',
    );
    await page.getByRole('link', { name: 'Back to deployments' }).click();
    await expect(page).toHaveURL(deployments);
    await expect(page.getByRole('combobox', { name: 'Year' })).toHaveValue('2011');
    await expect(page.getByRole('button', { name: 'Glider type' })).toHaveText('Seaglider');
    await expect(page.getByRole('button', { name: 'Data mode' })).toHaveText('Delayed');
    await expect(page.getByRole('switch', { name: 'Table view' })).toHaveAttribute(
      'aria-checked',
      String(view === 'table'),
    );
  });
}

test('opens Gliders notes directly and links back to the deployment table', async ({ page }) => {
  await page.goto('/about/gliders');
  await expect(page.getByRole('heading', { name: 'Gliders notes and resources' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Back to deployments' })).toHaveAttribute(
    'href',
    '/map/gliders?view=table',
  );
});

test('retries an ANFOG lookup and opens the profile at the tagged image date', async ({ page }) => {
  const id = 'LizardSlope20210317@5.01';
  const mission = {
    id,
    mission_name: 'LizardSlope20210317',
    glider_id: 'SL502',
    is_nrt: false,
    visualisations: {},
    image_history: { '12d': [{ date: '2021-03-31T00:00:00', url: '/gliders/anfog.gif' }] },
  };
  let requests = 0;
  await page.route('**/api/v1/gliders/missions?*', (route) =>
    ++requests === 1 ? route.fulfill({ status: 503 }) : route.fulfill({ json: { missions: [mission], total: 1 } }),
  );
  await page.route('**/api/v1/gliders/missions/*', (route) => route.fulfill({ json: mission }));
  await page.route('**/resource/gliders/anfog.gif', (route) =>
    route.fulfill({ body: Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64') }),
  );
  await page.goto('/gliders/from-image-tag?mission=LizardSlope20210317&glider=SL502&date=20210331');
  await expect(page.getByRole('alert')).toContainText('Unable to load');
  await page.getByRole('button', { name: 'Try again' }).click();
  await expect(page).toHaveURL(/missionId=LizardSlope20210317%405\.01&window=12d&date=2021033100$/);
  await expect(page.getByRole('img', { name: 'LizardSlope20210317 12d mission profile' })).toBeVisible();
});
