import { describe } from 'node:test';
import { test, expect, Page } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

describe('navigation', () => {
  test('url from argo page should open same content', async ({ page, context }) => {
    const navigateToArgo = async () => {
      await page.getByRole('navigation').getByText('In-Water').hover();
      await page.getByRole('link', { name: 'Argo Argo Ocean observation' }).click();
    };

    const expectToBeOnArgoPage = async (page: Page) => {
      await expect(page.getByRole('region', { name: 'Map' })).toBeVisible();
      await expect(page.getByTestId('drop-down-menu').locator('div').filter({ hasText: 'Argo' })).toHaveClass(
        /bg-\[#52BDEC80\]/,
      );
      await page.waitForLoadState('networkidle');
    };

    const closeNavigationMenu = async () => {
      await page.getByRole('link', { name: 'OceanCurrent' }).hover();
      await expect(page.getByRole('link', { name: 'Argo Argo Ocean observation' })).not.toBeVisible();
    };

    const mapContentToPNG = async (page: Page) => {
      const screenshot = await page.locator('canvas').screenshot();
      return PNG.sync.read(screenshot);
    };

    await navigateToArgo();
    await expectToBeOnArgoPage(page);
    await closeNavigationMenu();

    const expectedImage = await mapContentToPNG(page);

    const newPage = await context.newPage();
    await newPage.goto(page.url());
    await expectToBeOnArgoPage(newPage);
    const actualImage = await mapContentToPNG(newPage);

    expect(actualImage.width).toBe(expectedImage.width);
    expect(actualImage.height).toBe(expectedImage.height);
    expect(
      pixelmatch(expectedImage.data, actualImage.data, undefined, actualImage.width, actualImage.height, {
        threshold: 0.1,
      }),
      'Mapbox should render same content',
    ).toBe(0);
  });
});
