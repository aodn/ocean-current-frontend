import type { Page } from '@playwright/test';
import { MOCK_TAG_BODY } from '../data/argo-tags';
import { MOCK_IMAGE_SVG } from '../data/mock-images';

export async function registerImageMapTooltipMocks(page: Page): Promise<void> {
  // Tags are only requested once the selected date is confirmed by the catalogue.
  // Keep these tests independent of the live metadata backend as well as the file server.
  await page.route('**/api/v1/metadata/image-list/sixDaySst-sst?*', (route) => {
    return route.fulfill({
      json: [
        {
          productId: 'sixDaySst-sst',
          region: 'SGBR',
          path: '/DR_SST_daily/SST/SGBR',
          files: [{ name: '20251110.gif' }],
        },
      ],
    });
  });

  await page.route('**/api/v1/metadata/latest-dates/sixDaySst-sst', (route) => {
    return route.fulfill({
      json: {
        productId: 'sixDaySst-sst',
        regionLatestDates: [{ region: 'SGBR', latestDate: '20251110', path: '/DR_SST_daily/SST/SGBR' }],
      },
    });
  });

  await page.route('**/TAGS/**/*.txt', (route) => {
    return route.fulfill({
      status: 200,
      contentType: 'text/plain',
      body: MOCK_TAG_BODY,
    });
  });

  await page.route('**/*.gif', (route) => {
    return route.fulfill({
      status: 200,
      contentType: 'image/svg+xml',
      body: MOCK_IMAGE_SVG,
    });
  });
}
