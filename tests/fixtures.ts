import { test as base, expect, type Page, type Request, type BrowserContext } from '@playwright/test';
import { logApiRequests } from './helpers/debug';

export const test = base.extend({
  page: async ({ page }, use) => {
    logApiRequests(page);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page);
  },
});

export { expect, type Page, type Request, type BrowserContext };
