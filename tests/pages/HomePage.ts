import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Map } from './components/Map';
import { ProductCarousel } from './components/ProductCarousel';

export class HomePage extends BasePage {
  readonly map: Map;
  readonly carousel: ProductCarousel;
  readonly mapCarouselProductTitle: Locator;
  readonly feedbackButton: Locator;

  constructor(page: Page) {
    super(page);
    this.map = new Map(page);
    this.carousel = new ProductCarousel(page);
    this.mapCarouselProductTitle = page.getByTestId('map-carousel-product-title');
    this.feedbackButton = page.getByRole('link', { name: 'Provide feedback on this version of the website' });
  }

  async load(): Promise<void> {
    await super.goto('/');
  }

  async getMapCarouselProductTitle(): Promise<string | null> {
    await expect(this.mapCarouselProductTitle).toBeVisible();
    return this.mapCarouselProductTitle.textContent();
  }
}
