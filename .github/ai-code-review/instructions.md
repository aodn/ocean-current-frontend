This repository is `ocean-current-frontend`, the React frontend of the IMOS
Ocean Current website: React 18, TypeScript (strict), Vite, Zustand for client
state, TanStack Query for server state, React Router v7, Tailwind CSS, Mapbox
GL via `react-map-gl`, Vitest + Testing Library for unit tests and Playwright
for end-to-end tests. It lists products, dates and regions from the
`ocean-current-api` Spring Boot API and loads pre-rendered product images from
the legacy file server through the `/resource` and `/storage` proxy paths.

Pay particular attention to:

- React correctness: hook dependency arrays, stale closures, effects that
  subscribe or add map layers/sources without cleaning up, state updates after
  unmount, components defined inside other components, and keys in lists.
- State and URL sync: product, region and date are kept in Zustand stores and
  in URL query parameters. Check that changes keep them consistent, handle
  invalid or missing query parameters, and don't cause render loops.
- Dates: products have different temporal resolutions (daily, monthly,
  hourly, ...) and file names encode dates in product-specific formats. Watch
  for timezone mistakes (UTC vs local), off-by-one days/months and wrong
  `dayjs` format strings.
- Image and data URLs: paths built for the legacy file server must match the
  product/region/date conventions and go through the proxy paths, not the
  legacy domain directly.
- Mapbox GL: layers and sources added more than once, event handlers not
  removed, and work done before the map or style has loaded.
- Async and data fetching: unhandled promise rejections, race conditions
  between overlapping requests, TanStack Query keys that miss a parameter the
  query depends on, and assumptions about the shape of API responses (fields
  may be missing).
- Security: `dangerouslySetInnerHTML` or parsed HTML (`node-html-parser`),
  building URLs from user or API data, and anything committed that looks like
  a token or key. `VITE_*` values in `.env*` files are build-time config and
  end up in the public bundle.
- Tests: behaviour changes and bug fixes should have Vitest coverage in a
  colocated `*.test.ts(x)` file. UI flow changes may need Playwright specs or
  page objects under `tests/` updated.

Reusable code, for the duplicate-implementation check:

- Utilities: `src/utils/`, by topic (date formatting, URL building, ...).
- Hooks: `src/hooks/`.
- Shared UI: `src/components/Shared/`, with feature components elsewhere
  under `src/components/`.
- Constants: `src/constants/`, including product and region definitions.
- API clients and TanStack Query hooks: `src/services/`.
- Zustand stores: product, region and date state.

Only report it when the behaviour really matches, not when the two only look
alike (e.g. two date formatters for different, product-specific formats are
not duplicates). Name the existing code the PR should reuse, with its file
and line, and say whether it can be used as is or needs a small change.

Conventions: single quotes, `@/` import alias for `src/`, PascalCase component
files, `use`-prefixed hooks, gitmoji commit messages. Do not report issues that
ESLint, Prettier or the TypeScript compiler would catch.
