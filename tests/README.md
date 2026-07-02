# E2E Tests

This directory contains end-to-end (E2E) tests for the Ocean Current Frontend application using Playwright. The framework is structured around the **Page Object Model (POM)** pattern, utilizing custom fixtures, mocks, and utility modules to keep specs concise, isolated, and focused on test intent.

## Directory Structure

The testing framework is organized as follows:

```
tests/
├── fixtures/        # Custom Playwright fixtures (e.g., Page Objects, Mock API loaders)
│   ├── base-test.ts # Fixture definitions mapping Pages to tests
│   └── mock-api.fixture.ts
├── mocks/           # Mock data and API route interceptors
│   ├── data/        # Static data stubs (e.g. tags, SVG layouts)
│   └── routes/      # Network interception and route registration
├── pages/           # Page Object Model classes
│   ├── components/  # Reusable page components (e.g., Navbar, Map, Carousel)
│   ├── BasePage.ts  # Common page utility methods and shared elements
│   └── ...          # Specific pages (e.g., HomePage, ProductPage, MapPage)
├── specs/           # Test specifications grouped by route namespaces
│   ├── about/       # Specs for /about/* routes
│   ├── map/         # Specs for /map/* routes (including map-page.spec.ts)
│   ├── news/        # Specs for /news/* routes
│   ├── product/     # Specs for /product/* routes
│   └── ...          # Top-level specs (e.g., home-page, error-pages)
└── utils/           # Helper scripts and global test constants
    └── constants/   # Shared configurations (e.g., viewports, regexes)
```

## Running Tests

### Local Development (against localhost)

By default, tests run against `http://localhost:5173` and automatically start the dev server:

```bash
# Run all E2E tests
yarn test:e2e

# Run tests targeting a specific spec folder
yarn test:e2e tests/specs/product

# Run tests in UI mode (interactive)
yarn test:e2e:ui

# Run tests in headed mode (see browser)
yarn test:e2e:headed

# View test report
yarn test:e2e:report
```

### Testing Against Production

To test against the production environment:

```bash
yarn test:e2e:production
```

## CI/CD Integration

E2E tests run automatically on:

- **Pull Requests** to `main` branch
- **Pushes** to `main` branch

The CI workflow:

1. Installs dependencies
2. Runs linting
3. Runs unit tests with coverage
4. Builds the application
5. Installs Playwright browsers
6. Runs E2E tests against the built application
7. Uploads test reports as artifacts (available for 30 days)

## Configuration

The Playwright configuration is in [`playwright.config.ts`](../playwright.config.ts).

Key settings:

- **Base URL**: Controlled by `PLAYWRIGHT_TEST_BASE_URL` environment variable (defaults to `http://localhost:5173`)
- **Browsers**: Chromium (Desktop Chrome)
- **Retries**: 2 retries on CI, 0 retries locally
- **Reporter**: GitHub reporter on CI, HTML reporter locally
- **Web Server**: Automatically starts dev server on `http://localhost:5173` (unless already running)

## Test Selectors

Tests use robust selectors with `data-testid` attributes where possible:

- `data-testid="carousel-container"` - Product carousel
- `data-testid="date-pagination"` - Date navigation component
- `data-testid="date-previous-button"` - Previous date button
- `data-testid="date-next-button"` - Next date button
- `data-testid="date-reset-button"` - Reset to latest date button
- `data-testid="main-navbar"` - Main navigation bar

## Architecture & Core Concepts

### 1. Custom Fixtures (`fixtures/`)

Instead of instantiating Page Objects manually in every spec file, we extend Playwright's base test block in [base-test.ts](./fixtures/base-test.ts) to inject Page Object instances automatically:

```typescript
import { test } from '../../fixtures/base-test';

test('example test', async ({ homePage, productPage }) => {
  await homePage.load();
  await homePage.carousel.openFirstProduct();
  await expect(productPage.productImage).toBeVisible();
});
```

### 2. Page Objects (`pages/`)

Page objects encapsulate page structures, selectors, and user actions.

- **[BasePage.ts](./pages/BasePage.ts):** The base class for all Page Objects. It exposes common utilities like navigating (`goto`), reading search parameters, waiting on states, and tracking requests. It also maps global elements like the `Navbar` and `Footer`.
- **Components (`pages/components/`):** Reusable layout sections (such as [Navbar.ts](./pages/components/Navbar.ts) or [Map.ts](./pages/components/Map.ts)) are extracted into independent component classes and instantiated inside their parent Page Objects.

### 3. API Mocking (`mocks/`)

Mocking is separated from spec logic:

- Mock responses and routes are registered via the custom `mockApi` fixture.
- Interception logic is organized inside `mocks/routes/` and uses static payloads declared in `mocks/data/`.
- Example usage in a spec:
  ```typescript
  test.beforeEach(async ({ mockApi }) => {
    await mockApi.useSurfaceWavesMocks();
  });
  ```

### 4. Utilities and Constants (`utils/`)

Global configurations and patterns (e.g., standard viewport widths, URL regexes) are stored under `utils/constants/` to keep selectors and assertion patterns DRY.

## Test Coverage

- **Home Page (`specs/home-page.spec.ts`):** Verifies basic layout, header menus, responsive navigation behavior, product carousel navigation, and basic map zoom controls.
- **Map Pages (`specs/map/`):** Focuses on region polygon selections, and date navigation controls on map pages.
- **Product Pages (`specs/product/`):** Tests sub-product transitions, date picker changes, nearest date searches, image/Argo tag loaders, and deep links.
- **About Pages (`specs/about/`):** Ensures "About" content is accessible, responsive, and handles invalid products or tabs safely.
- **News & Redirects (`specs/news/` & `specs/error-pages.spec.ts`):** Validates news filtering/anchoring, legacy redirect rules (such as `.php` queries), and 404 pages.

## Troubleshooting

### Tests fail locally

- Ensure the dev server is not already running on port 5173
- Clear browser cache and restart tests
- Check if all dependencies are installed: `yarn install`
- Reinstall Playwright browsers: `yarn playwright install --with-deps chromium`

### CI tests fail

- Check the uploaded Playwright report artifact in GitHub Actions
- Review screenshots and traces in the report
- Verify that the build step completed successfully

## Adding New Tests

1.  **Determine the target route:** Locate the route namespace under the `specs/` directory (e.g., `specs/product/` for product-related specs).
2.  **Create a spec file:** Create your spec file with the `.spec.ts` suffix (e.g., `specs/product/new-feature.spec.ts`).
3.  **Use custom fixtures:** Import `test` and `expect` from the custom base fixture, not the default Playwright library:
    ```typescript
    import { test, expect } from '../../fixtures/base-test';
    ```
4.  **Extend Page Objects:** If your new test introduces new UI elements or actions, add them as properties or helper methods to the respective class in the `pages/` directory instead of hardcoding selectors in the spec.
