import type { Page } from '@playwright/test';
import { MOCK_TAG_BODY } from '../data/argo-tags';
import { MOCK_IMAGE_SVG } from '../data/mock-images';

export async function registerImageMapTooltipMocks(page: Page): Promise<void> {
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
