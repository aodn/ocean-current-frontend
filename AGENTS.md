# Repository Guidelines

Guidance for AI coding agents working in this repository.

## Visualisation model

**Today:** the app displays **pre-rendered static images**. A third party (CSIRO) runs the "raw data → image" pipeline and uploads images to the legacy file server; this app re-develops the legacy PHP site to display them. We hold the raw data on the IMOS/AODN side.

## Common Commands

Requires Node 24+ (`.nvmrc`) and Yarn 4 via Corepack (`corepack enable`). Copy `.env.local.example` → `.env.local`; only `VITE_MAPBOX_ACCESS_TOKEN` is required.

- `yarn dev` — dev server (port from `VITE_PORT`, default 5173); `yarn dev:log` also logs proxied requests
- `yarn build` / `yarn build:edge` — `tsc` then `vite build` (edge uses `--mode edge`)
- `yarn typecheck` — TypeScript only (app + node configs)
- `yarn lint` / `yarn lint:fix` — ESLint, `--max-warnings 0`
- `yarn prettier` / `yarn prettier:fix` — Prettier (with Tailwind class sorting)

### Unit tests (Vitest, jsdom)

- `yarn test` — run once; `yarn test:watch` — watch mode; `yarn coverage`
- Single file: `yarn vitest run path/to/file.test.ts`
- By name: `yarn vitest run -t "test description"`
- Only `src/**/*.test.{ts,tsx}` is picked up, co-located next to the module (`Foo.test.tsx`). Globals are enabled; setup in `src/test/setup.ts` (jest-dom, `vitest-canvas-mock`, `matchMedia`/`scrollTo` stubs).
- Add or update tests for bug fixes and behaviour changes. No numeric coverage threshold is configured, but CI generates a coverage report.

### E2E tests (Playwright, `tests/`)

- `yarn test:e2e` — starts the dev server automatically; `yarn test:e2e tests/specs/product` for one folder
- `yarn test:e2e:ui` / `yarn test:e2e:headed` / `yarn test:e2e:report`
- `yarn test:e2e:production` — smoke run against production
- Page Object Model: page objects in `tests/pages/`, fixtures in `tests/fixtures/`, API route mocks in `tests/mocks/`, specs in `tests/specs/**/*.spec.ts`. Reuse existing fixtures and page objects rather than duplicating selectors. See `tests/README.md`.

## Architecture

### Request paths and proxying

All requests use relative paths (`src/configs/api.ts`); in production the deployment host serves them, in dev the Vite proxy forwards them:

| Path        | Used for                                          | Dev upstream env var (default: edge) |
| ----------- | ------------------------------------------------- | ------------------------------------ |
| `/api/v1`   | Spring Boot API (`apiClient`)                     | `VITE_API_BACKEND_URL`               |
| `/resource` | Legacy file server images/HTML (`ec2ProxyClient`) | `VITE_API_EC2_PROXY_URL`             |
| `/storage`  | S3 files                                          | `VITE_API_S3_PROXY_URL`              |

Axios clients live in `src/services/httpClient.ts`; service functions in `src/services/*.ts`; TanStack Query hooks in `src/services/hooks/` and `src/hooks/` (shared query options in `src/configs/query.ts`).

### Product model (central concept)

- Every product is declared in `OC_PRODUCTS` (`src/constants/product.ts`): a tree of product groups → sub-products with `key` (the `ProductID`, e.g. `fourHourSst-sst`), URL `path`, image path segments, and per-region-scope (`local`/`state`) date formats.
- URLs are `/product/:product/:subProduct` (data view) and `/map/:product/:subProduct` (map view); `src/routers/routes.tsx` is a hand-written route object. Hooks like `useProductIdFromUrl` / `useSetProductId` resolve the URL to a `ProductID` and sync it into `productStore`. Group-level URLs redirect using `DEFAULT_SUB_PRODUCT_ROUTES` (`src/configs/products/default-routes.ts`).
- `src/configs/products/` controls **where each product's image/date list comes from**:
  - `API_IMAGE_LIST_ENABLED_PRODUCTS` — fetched from the API (`/metadata/image-list/...`)
  - `FIXED_IMAGE_LIST_PRODUCTS` — static/generated lists (see `src/hooks/useDateList/mockData.ts`)
  - `API_LATEST_DATES_DISABLED_PRODUCTS` — skip the latest-dates endpoint
  - `id-mapping.ts` — frontend `ProductID`/region → backend ID/region where they differ (always go through `getApiProductId` / `getApiRegionCode`)
- `useDateList` (`src/hooks/useDateList/`) is the main place that picks between these sources, and `buildStaticImageUrl` / other builders in `src/utils/data-image-builder-utils/` turn product + region + date into image URLs.
- Adding or changing a product usually means touching `OC_PRODUCTS`, the relevant lists in `src/configs/products/`, and the `ProductID` types in `src/types/product`.

### State

Zustand stores in `src/stores/*-store/` (each with a `*.types.ts`): `productStore`, `dateStore`, `mapStore`, `argoStore`, `currentMeters`, `fishSoop`. Server data belongs in TanStack Query, not the stores.

### Layout and UI

- `src/pages/` — route pages (`DataView`, `MapView`, `AboutView`, `InfoView`, `News`, …), each wrapped by a layout in `src/layouts/`. The News route is lazy-loaded to keep it out of the main bundle.
- `src/components/Map/` — Mapbox GL via `react-map-gl` (layers, controls, panels); `src/components/Shared/` — reusable primitives.
- Tailwind CSS v4 (Vite plugin). SVGs import as React components via `vite-plugin-svgr`.
- `vite-plugin-checker` surfaces TypeScript/ESLint errors in the browser overlay during `yarn dev`.
- `@/` aliases `src/`. Imported images/SVGs go in `src/assets/`; files served as-is go in `public/`.
- Naming: components and their files in PascalCase, hooks start with `use`, utilities in camelCase.
- Formatting uses two-space indentation, single quotes, semicolons, trailing commas, and a 120-character line limit, enforced by Prettier and ESLint.
- Prefer strict types and focused components.

### Dates

Product dates are local, not UTC. Use Day.js `.format(...)` (configured in `src/configs/dayjs.ts`, which also overrides `toString()` to avoid UTC conversion). Avoid `Date.toISOString()` and `toLocaleDateString()` — they shift or localise the date.

## Git Worktrees

Linked worktrees live at `../ocean-current-frontend.worktrees/<type>/<branch-name>/`. If the current directory is one of these:

- File edits affect only this branch — not the main worktree at `../ocean-current-frontend/`.
- `scripts/setup-worktree.sh` (run by the Husky `post-checkout` hook and `postinstall`) copies `.env.local` and symlinks `.claude`, `.agents`, `CLAUDE.md`, and `AGENTS.md` from the main worktree. Run `yarn install` in a new worktree.

## Development Workflow

- **Branches:** `<type>/<issue-number>-<description>`, where type is `hotfix`, `fix`, `bugfix`, `feature`, `test` (POC), or `chore`. Issue numbers refer to `aodn/backlog`.
- **Commits:** gitmoji prefix in `:shortcode:` form (e.g. `:bug:`, `:sparkles:`, `:lipstick:`, `:white_check_mark:`, `:fire:`), enforced by commitlint; header max 72 characters.
- **Pre-commit (Husky):** lint-staged (ESLint + Prettier on staged files) then the full `yarn test` suite.
- **CI** (`.github/workflows/ci.yml`): lint, coverage, production build, and Playwright E2E.
- **PRs:** keep changes focused, link the `aodn/backlog` issue, describe user-visible behaviour and how it was validated, and include screenshots for UI changes. Before requesting review, run `yarn lint`, `yarn prettier`, `yarn test`, and the relevant Playwright specs.

## Coding Principles

Don't over-abstract — avoid creating helpers or splitting code just for the sake of it. But do extract when it's worth it, for example:

- A component has meaningful complexity and distinct responsibilities
- Extraction fixes a React anti-pattern (e.g. component defined inside another component)
- The extracted piece is independently testable
- The parent becomes meaningfully cleaner and more focused

Use judgement on a case-by-case basis.

## Configuration & Security

Keep secrets and local endpoints in `.env.local`; expose browser configuration only through intentional `VITE_` variables. Never commit access tokens, credentials, generated reports, or local environment files.
