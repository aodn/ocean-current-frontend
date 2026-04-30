import { test, expect } from '@playwright/test';

test.describe('News PHP redirect', () => {
  test('redirects /news.php to /news', async ({ page }) => {
    await page.goto('/news.php');
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/news');
    expect(page.url()).not.toContain('/news.php');
  });

  test('redirects /news.php with hash to /news preserving the hash', async ({ page }) => {
    await page.goto('/news.php#a-news-title');
    await page.waitForLoadState('networkidle');

    expect(page.url()).toContain('/news#a-news-title');
    expect(page.url()).not.toContain('/news.php');
  });
});
