import type { Page } from '@playwright/test';
import { MOCK_IMAGE_SVG } from '../data/mock-images';

export const MOCK_BUOY_TAGS = JSON.stringify({
  tagFile: 'mock',
  tags: [{ x: 400, y: 300, sz: 15, title: 'Maria_Island', url: 'TS Maria Island' }],
});

export async function registerSurfaceWavesMocks(page: Page): Promise<void> {
  await page.route('**/*.gif', (route) => {
    return route.fulfill({ status: 200, contentType: 'image/svg+xml', body: MOCK_IMAGE_SVG });
  });
  await page.route('**/*.png', (route) => {
    return route.fulfill({ status: 200, contentType: 'image/svg+xml', body: MOCK_IMAGE_SVG });
  });
  await page.route('**/api/v1/tags/**', (route) => {
    return route.fulfill({ status: 200, contentType: 'application/json', body: MOCK_BUOY_TAGS });
  });
}
