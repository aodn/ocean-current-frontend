import { test, expect } from '../../fixtures/base-test';

test.describe('News PHP redirect', () => {
  test('redirects /news.php to /news', async ({ newsPage }) => {
    await newsPage.goto('/news.php');
    await newsPage.page.waitForURL(/\/news($|\?|#)/);

    expect(newsPage.url()).toContain('/news');
    expect(newsPage.url()).not.toContain('/news.php');
  });

  test('redirects /news.php with hash to /news preserving the hash', async ({ newsPage }) => {
    await newsPage.goto('/news.php#a-news-title');
    await newsPage.page.waitForURL(/\/news#a-news-title$/);

    expect(newsPage.url()).toContain('/news#a-news-title');
    expect(newsPage.url()).not.toContain('/news.php');
  });
});
