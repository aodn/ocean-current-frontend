import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class NewsPage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByTestId('news-page-heading');
  }
}
