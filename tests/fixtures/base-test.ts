/* eslint-disable react-hooks/rules-of-hooks */
import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { MapPage } from '../pages/MapPage';
import { ProductPage } from '../pages/ProductPage';
import { AboutPage } from '../pages/AboutPage';
import { NewsPage } from '../pages/NewsPage';
import { MockApi } from './mock-api.fixture';

type TestFixtures = {
  homePage: HomePage;
  mapPage: MapPage;
  productPage: ProductPage;
  mockApi: MockApi;
  aboutPage: AboutPage;
  newsPage: NewsPage;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  mapPage: async ({ page }, use) => {
    await use(new MapPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  mockApi: async ({ page }, use) => {
    await use(new MockApi(page));
  },
  aboutPage: async ({ page }, use) => {
    await use(new AboutPage(page));
  },
  newsPage: async ({ page }, use) => {
    await use(new NewsPage(page));
  },
});

export { expect };
