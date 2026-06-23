import { test } from '@playwright/test';

/**
 * Reachability gate for live-data e2e specs.
 *
 * Several specs assert on real data served by the Ocean Current backend
 * (`oceancurrent.edge.aodn.org.au`, reached through the dev/preview proxy):
 * image lists, latest-dates, Argo tags, and `.gif`/`.txt` files. When that
 * backend is slow or unreachable from the CI runner, every one of those specs
 * fails together across all retries — a transient infrastructure outage, not a
 * regression in the app.
 *
 * This gate skips (rather than fails) those specs when the backend is
 * unreachable, so a backend outage no longer turns CI red while the real
 * integration coverage is preserved whenever the backend is up.
 */

// `latest-dates` for the default product always returns 200 when the backend is
// up, and it exercises the exact `/api/v1` → backend proxy path the app uses.
const PROBE_PATH = '/api/v1/metadata/latest-dates/sixDaySst-sst';
const PROBE_TIMEOUT_MS = 15_000;
const FALLBACK_BASE_URL = 'http://localhost:4173';

// Cached per worker process (each worker imports this module fresh), so the
// probe runs at most once per worker instead of once per test.
let reachable: boolean | undefined;

async function isBackendReachable(baseURL: string): Promise<boolean> {
  if (reachable !== undefined) return reachable;
  try {
    const res = await fetch(new URL(PROBE_PATH, baseURL), {
      signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
    });
    reachable = res.ok;
  } catch {
    reachable = false;
  }
  return reachable;
}

/**
 * Skip the current test when the live backend is unreachable. Call from a spec's
 * `test.beforeEach`:
 *
 *   test.beforeEach(async ({ baseURL }) => skipIfBackendUnreachable(baseURL));
 */
export async function skipIfBackendUnreachable(baseURL: string | undefined): Promise<void> {
  const ok = await isBackendReachable(baseURL ?? FALLBACK_BASE_URL);
  test.skip(!ok, 'Live Ocean Current backend unreachable — skipping live-data e2e spec');
}
