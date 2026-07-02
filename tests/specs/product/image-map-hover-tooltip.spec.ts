import { test } from '../../fixtures/base-test';
import { ARGO_TOOLTIP, SOOP_TOOLTIP } from '../../mocks';

test.describe('Data Image Map - Hover Tooltip (Issue #317)', () => {
  test.beforeEach(async ({ productPage, mockApi }) => {
    await mockApi.useImageMapTooltipMocks();

    await productPage.goto('/product/six-day-sst/sst?region=SGBR&date=20251110');
    await productPage.waitForImageMap();
  });

  test('TC-317-1: SOOP areas have ship name as data-tooltip attribute', async ({ productPage }) => {
    await productPage.imageMap.expectAreaExists(SOOP_TOOLTIP);
  });

  test('TC-317-2: Argo areas have dataSource filename as data-tooltip attribute', async ({ productPage }) => {
    await productPage.imageMap.expectAreaExists(ARGO_TOOLTIP);
  });

  test('TC-317-3: all areas use cursor-pointer', async ({ productPage }) => {
    await productPage.imageMap.expectAllAreasUsePointerCursor();
  });

  test('TC-317-4: hovering an Argo area shows the custom tooltip with dataSource text', async ({ productPage }) => {
    await productPage.imageMap.hoverArea(ARGO_TOOLTIP);
    await productPage.imageMap.expectTooltipText(ARGO_TOOLTIP);
  });

  test('TC-317-5: hovering a SOOP area shows the custom tooltip with ship name', async ({ productPage }) => {
    await productPage.imageMap.hoverArea(SOOP_TOOLTIP);
    await productPage.imageMap.expectTooltipText(SOOP_TOOLTIP);
  });
});
