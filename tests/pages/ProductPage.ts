import { expect, type Locator, type Page } from '@playwright/test';
import { URL_DATE_QUERY_REGEX, URL_DATE_PARAM_REGEX } from '../utils/constants/regex-patterns';
import { BasePage } from './BasePage';
import { Map } from './components/Map';
import { ImageMap } from './components/ImageMap';

export class ProductPage extends BasePage {
  readonly map: Map;
  readonly imageMap: ImageMap;
  readonly datePicker: Locator;
  readonly datePreviousButton: Locator;
  readonly selectedDate: Locator;
  readonly dateNextButton: Locator;
  readonly resetDateButton: Locator;
  readonly productImage: Locator;
  readonly productNotAvailableError: Locator;
  readonly readMoreButton: Locator;
  readonly regionLabel: Locator;
  readonly buoyTimeseriesButton: Locator;
  readonly mapButton: Locator;
  readonly mooredInstrumentArrayButton: Locator;

  constructor(page: Page) {
    super(page);
    this.map = new Map(page);
    this.imageMap = new ImageMap(page);
    this.datePicker = page.getByTestId('date-pagination');
    this.datePreviousButton = page.getByTestId('date-previous-button');
    this.selectedDate = page.getByTestId('selected-date');
    this.dateNextButton = page.getByTestId('date-next-button');
    this.resetDateButton = page.getByTestId('date-reset-button');
    this.productImage = page.locator('img[alt="product"]').first();
    this.productNotAvailableError = page.locator('text=is not available for this product');
    this.readMoreButton = this.getByText('Read more', true);
    this.regionLabel = this.getByText('Region', true);
    this.buoyTimeseriesButton = this.getButton('Buoy Timeseries');
    this.mapButton = this.getButton('Map');
    this.mooredInstrumentArrayButton = this.getButton('Moored Instrument Array');
  }

  getAboutDatasetButton(datasetName: string): Locator {
    return this.getButton(`About ${datasetName} dataset`, false);
  }

  async waitForImageMap(): Promise<void> {
    await this.imageMap.waitForAreas();
  }

  async getSelectedDateValue(): Promise<string | null> {
    return await this.selectedDate.getAttribute('data-timestamp');
  }

  async getResolvedDate(): Promise<string> {
    await this.page.waitForURL(URL_DATE_QUERY_REGEX, { timeout: 15000 });
    const date = this.getSearchParamFromURL('date');
    expect(date).toMatch(URL_DATE_PARAM_REGEX);
    return date as string;
  }

  async getDateParam(): Promise<string | null> {
    // Give the app time to resolve the date and update the URL
    await this.page.waitForTimeout(3000);
    return this.getSearchParamFromURL('date');
  }

  parseDateParam(dateStr: string): Date {
    const year = parseInt(dateStr.slice(0, 4));
    const month = parseInt(dateStr.slice(4, 6)) - 1;
    const day = dateStr.length >= 8 ? parseInt(dateStr.slice(6, 8)) : 1;
    return new Date(year, month, day);
  }
}
