/* eslint-disable no-console */
import { type Page } from '@playwright/test';

/**
 * Logs every /api/v1 request with its URL, HTTP status, and round-trip duration.
 * Helps distinguish slow-network failures (high ms) from API errors (non-200)
 * or outright network failures (requestfailed).
 *
 * Usage: call in beforeEach or at the top of a test before page.goto().
 */
export function logApiRequests(page: Page) {
  page.on('requestfinished', async (req) => {
    if (!/\/api\/v1\//.test(req.url())) return;
    const res = await req.response();
    const t = req.timing();
    const ms = (t.responseEnd - t.requestStart).toFixed(0);
    console.log(`[API] ${res?.status() ?? '?'} ${req.url()} (${ms}ms)`);
  });

  page.on('requestfailed', (req) => {
    if (!/\/api\/v1\//.test(req.url())) return;
    console.log(`[API FAIL] ${req.url()} — ${req.failure()?.errorText}`);
  });
}
