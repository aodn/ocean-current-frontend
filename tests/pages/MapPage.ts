import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Map } from './components/Map';

export class MapPage extends BasePage {
  readonly map: Map;
  readonly datePicker: Locator;
  readonly datePreviousButton: Locator;
  readonly selectedDate: Locator;
  readonly dateNextButton: Locator;
  readonly resetDateButton: Locator;
  readonly sidebar: Locator;

  constructor(page: Page) {
    super(page);
    this.map = new Map(page);
    this.datePicker = page.getByTestId('date-pagination');
    this.datePreviousButton = page.getByTestId('date-previous-button');
    this.selectedDate = page.getByTestId('selected-date');
    this.dateNextButton = page.getByTestId('date-next-button');
    this.resetDateButton = page.getByTestId('date-reset-button');
    this.sidebar = page.getByTestId('drop-down-menu');
  }
}
