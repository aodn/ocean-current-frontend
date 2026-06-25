import { test, expect } from './fixtures';

test.describe('News PHP redirect', () => {
  test('redirects /news.php to /news', async ({ page }) => {
    await page.goto('/news.php');
    await page.waitForURL(/\/news($|\?|#)/);

    expect(page.url()).toContain('/news');
    expect(page.url()).not.toContain('/news.php');
  });

  test('redirects /news.php with hash to /news preserving the hash', async ({ page }) => {
    await page.goto('/news.php#a-news-title');
    await page.waitForURL(/\/news#a-news-title$/);

    expect(page.url()).toContain('/news#a-news-title');
    expect(page.url()).not.toContain('/news.php');
  });
});
