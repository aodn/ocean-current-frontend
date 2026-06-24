import dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const PORT = process.env.VITE_PORT || '5173';
const PREVIEW_PORT = '4173';
const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || `http://localhost:${process.env.CI ? PREVIEW_PORT : PORT}`;
const MAPBOX_ACCESS_TOKEN = process.env.VITE_MAPBOX_ACCESS_TOKEN || 'pk.dummy-token-for-testing';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'github' : 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  /* Per-test timeout — raised from the 30s default to accommodate CI's slower
     production preview build (networkidle + expect.poll can exceed 30s there). */
  timeout: 60000,

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: BASE_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: process.env.PLAYWRIGHT_TEST_BASE_URL
    ? undefined
    : process.env.CI
      ? {
          command: `yarn build && yarn preview --port ${PREVIEW_PORT}`,
          url: `http://localhost:${PREVIEW_PORT}`,
          timeout: 120 * 1000,
          stdout: 'pipe',
          env: {
            VITE_MAPBOX_ACCESS_TOKEN: MAPBOX_ACCESS_TOKEN,
            VITE_PROXY_LOG: 'true',
          },
        }
      : {
          command: 'yarn dev',
          url: `http://localhost:${PORT}`,
          reuseExistingServer: true,
          timeout: 120 * 1000,
          stdout: 'pipe',
          env: {
            VITE_PORT: PORT,
            VITE_MAPBOX_ACCESS_TOKEN: MAPBOX_ACCESS_TOKEN,
            VITE_PROXY_LOG: 'true',
          },
        },
});
