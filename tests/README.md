# E2E Tests

This directory contains end-to-end (E2E) tests for the Ocean Current Frontend application using Playwright.

## Test Files

- `home-page.spec.ts` - Tests for the home page functionality (11 tests)
- `detail-page.spec.ts` - Tests for the detail/product pages (8 tests)

## Running Tests

### Local Development (against localhost)

By default, tests run against `http://localhost:5173` and automatically start the dev server:

```bash
# Run all E2E tests
yarn test:e2e

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

## Test Coverage

### Home Page Tests (TC001-TC011)
- Page loading and basic UI elements
- Navigation menus and dropdowns
- Map functionality and zoom controls
- Product carousel interaction

### Detail Page Tests (TC-767 to TC-774)
- Category navigation and region selection
- Date picker functionality
- Date navigation (previous/next)
- Reset functionality

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

1. Create a new test file in the `tests/` directory with `.spec.ts` extension
2. Follow the existing test structure and naming conventions
3. Use `data-testid` selectors where possible for robustness
4. Test locally before creating a PR: `yarn test:e2e`
5. Ensure tests pass on both local and production environments
