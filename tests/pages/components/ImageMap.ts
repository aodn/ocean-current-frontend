import { expect, type Locator, type Page } from '@playwright/test';

export class ImageMap {
  readonly areas: Locator;
  readonly image: Locator;
  readonly tooltip: Locator;

  constructor(private readonly page: Page) {
    this.areas = page.locator('map[name="argo-tag-map"] area');
    this.image = page.locator('img[usemap="#argo-tag-map"]');
    this.tooltip = page.getByTestId('image-map-tooltip');
  }

  areaByTooltip(tooltip: string): Locator {
    return this.page.locator(`map[name="argo-tag-map"] area[data-tooltip="${tooltip}"]`);
  }

  async waitForAreas(): Promise<void> {
    await this.page.waitForSelector('map[name="argo-tag-map"] area', { state: 'attached', timeout: 10000 });
  }

  async expectAreaExists(tooltip: string): Promise<void> {
    expect(await this.areaByTooltip(tooltip).count()).toBeGreaterThan(0);
  }

  async expectAllAreasUsePointerCursor(): Promise<void> {
    const count = await this.areas.count();
    for (let index = 0; index < count; index += 1) {
      await expect(this.areas.nth(index)).toHaveClass(/cursor-pointer/);
    }
  }

  async hoverArea(tooltip: string): Promise<void> {
    const area = this.areaByTooltip(tooltip).first();
    const imageBox = await this.image.boundingBox();
    const coords = (await area.getAttribute('coords'))!.split(',').map(Number);

    await this.page.mouse.move(imageBox!.x + coords[0], imageBox!.y + coords[1]);
  }

  async expectTooltipText(text: string): Promise<void> {
    await expect(this.tooltip).toBeVisible();
    await expect(this.tooltip).toHaveText(text);
  }
}
