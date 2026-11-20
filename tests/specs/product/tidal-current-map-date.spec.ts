import { expect, test } from '../../fixtures/base-test';

const imageList = '**/metadata/image-list/tidalCurrents-spd?region=Bass';
const requested = '202512310215';
const path = '/product/tidal-currents/speed?region=Bass&date=';

for (const [input, expected] of [
  [requested, requested],
  ['202512310313', '202701020145'],
  ['202412010000', '202701020145'],
  ['202712010000', '202701020145'],
  ['202701020145', '202701020145'],
]) {
  test(`resolves ${input} to ${expected} using the indexed folder`, async ({ page, productPage }) => {
    const folder = 'tides/Bass_spd/2026';
    await page.route(imageList, (route) =>
      route.fulfill({ json: [{ path: folder, files: [{ name: '202701020145.gif' }, { name: requested + '.gif' }] }] }),
    );
    await page.route('**/resource/**.gif', (route) =>
      route.fulfill({
        contentType: 'image/gif',
        body: Buffer.from('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==', 'base64'),
      }),
    );
    await page.route('**/resource/**/*.txt', (route) => route.fulfill({ body: '' }));
    await productPage.goto(path + input);
    await expect(page.getByAltText('tidalCurrents-spd data')).toHaveAttribute(
      'src',
      new RegExp(folder + '/' + expected + '\\.gif$'),
    );
    const timestamp = await page.evaluate(
      (date) =>
        date === '202512310215' ? new Date(2025, 11, 31, 2, 15).getTime() : new Date(2027, 0, 2, 1, 45).getTime(),
      expected,
    );
    await expect(productPage.selectedDate).toHaveAttribute('data-timestamp', String(timestamp));
    expect(productPage.getSearchParamFromURL('date')).toBe(expected);
  });
}

for (const status of [200, 404]) {
  test(`keeps the request when the index has no dates (HTTP ${status})`, async ({ page, productPage }) => {
    await page.route(imageList, (route) => route.fulfill({ status, json: [] }));
    await productPage.goto(path + requested);
    await expect(productPage.selectedDate).toBeVisible();
    await expect(productPage.productNotAvailableError).toBeVisible();
    await expect(productPage.datePreviousButton).toBeDisabled();
    await expect(productPage.dateNextButton).toBeDisabled();
    await expect(productPage.resetDateButton).toBeDisabled();
    expect(productPage.getSearchParamFromURL('date')).toBe(requested);
  });
}
