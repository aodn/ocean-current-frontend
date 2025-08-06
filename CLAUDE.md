# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development

- `yarn dev` - Start development server (runs on port from VITE_PORT env var, default 5173)
- `yarn build` - Build for production (runs TypeScript check first)
- `yarn build:edge` - Build for edge environment
- `yarn preview` - Preview production build locally

### Code Quality

- `yarn lint` - Run ESLint with caching
- `yarn lint:fix` - Auto-fix linting issues
- `yarn prettier` - Check code formatting
- `yarn prettier:fix` - Auto-format code

### Testing

- `yarn test` - Run tests once (using Vitest)
- `yarn test:watch` - Run tests in watch mode
- `yarn coverage` - Generate test coverage report

### Single Test

To run a single test file: `yarn vitest path/to/test-file.test.ts`
To run tests matching a pattern: `yarn vitest --grep "test description"`

## Architecture Overview

### State Management

- **Zustand** for global state management with separate stores:
  - `productStore` - Manages selected products and product-related state
  - `dateStore` - Handles date selection and navigation
  - `mapStore` - Map state and configuration
  - `argoStore` - Argo product-specific data
  - `currentMeters` - Current meters deployment data

### Data Fetching

- **TanStack Query** for server state management and caching
- Custom hooks in `src/services/hooks/` wrap API calls
- HTTP client configured in `src/services/httpClient.ts`
- Proxy configuration in Vite for `/ec2` and `/s3` endpoints

### Routing

- **React Router v7** with file-based routing structure
- Routes defined in `src/routers/routes.tsx`
- Layout components in `src/layouts/` provide consistent structure

### UI Components

- **React + TypeScript** with strict TypeScript configuration
- **Tailwind CSS** for styling with custom configurations
- Component library in `src/components/Shared/` for reusable elements
- Product-specific components organized by feature

### Map Integration

- **Mapbox GL JS** with `react-map-gl` wrapper
- Custom layers for different data visualizations (Argo, Current Meters, etc.)
- Map styling and configuration in `src/components/Map/`

### Key Data Types

- Ocean current products (SST, sea level, waves, etc.)
- Regional data with polygon boundaries
- Time series data with various temporal resolutions
- Geospatial data for deployments and measurements

## Development Workflow

### Branch Naming

Follow pattern: `<type>/<issue-number>-<description>`

- `hotfix/` - Critical fixes
- `fix/`/`bugfix/` - Bug fixes
- `feature/` - New features
- `test/` - Experiments/POCs
- `chore/` - Maintenance tasks

### Commit Messages

All commits must use gitmoji prefixes:

- 🐛 `:bug:` - Fix bugs
- ✨ `:sparkles:` - New features
- 💄 `:lipstick:` - UI/styling
- ✅ `:white_check_mark:` - Tests
- 🔥 `:fire:` - Remove code/files

### Pre-commit Hooks

Husky runs on every commit:

- Linting on staged files
- All tests
- Commit message format validation

## Key Configurations

### Path Aliases

- `@/*` maps to `./src/*` (configured in tsconfig.json and vite.config.ts)

### Environment

- Copy `.env.local.example` to `.env.local` for local development
- Vite environment variables prefixed with `VITE_`

### API Proxying

- `/ec2` proxies to `https://oceancurrent.aodn.org.au`
- `/s3` proxies to storage endpoint (configurable via VITE_API_S3_PROXY_URL)

## Testing

- **Vitest** with jsdom environment
- **Testing Library** for component tests
- Test setup in `src/test/setup.ts`
- Coverage excludes styles, types, and .d.ts files
