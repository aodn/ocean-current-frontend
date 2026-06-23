import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AboutPage extends BasePage {
  readonly exploreDatasetButton: Locator;

  constructor(page: Page) {
    super(page);

    this.exploreDatasetButton = this.page.getByText('Explore dataset');
  }

  async gotoEacMooringArray(): Promise<void> {
    await this.goto('/about/eac-mooring-array');
  }
}
