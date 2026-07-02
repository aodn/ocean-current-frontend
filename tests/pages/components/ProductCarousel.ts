import { expect, type Locator, type Page } from '@playwright/test';

export class ProductCarousel {
  readonly root: Locator;

  constructor(private readonly page: Page) {
    this.root = page.getByTestId('carousel-container');
  }

  firstProductLink(): Locator {
    return this.root.locator('a').first();
  }

  async expectVisible(): Promise<void> {
    await expect(this.root).toBeVisible();
  }

  async openFirstProduct(): Promise<void> {
    const firstProduct = this.firstProductLink();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();
    await this.page.waitForLoadState('load');
  }

  getCarouselItem(title: string): Locator {
    return this.page.getByTestId(`carousel-item-${title}`);
  }
}
