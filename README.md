# Project for Ocean Current Redevelopment

Welcome to our project, aimed at redefining the user experience and accessibility of ocean current. This project is part of a broader initiative to enhance the [Ocean Current](https://oceancurrent.aodn.org.au/) website, focusing on modern UI/UX design, streamlined data download processes, and improved visualisation features.

## Project Overview

- **Objective:** To enhance the user experience and accessibility of oceanographic data visualisation, aligning with modern UI/UX standards, and improving the efficiency of data downloads and the quality of visualisation.
- **Scope:** This includes a UI/UX redesign, transitioning Matlab processing to Python, and upgrading data visualisation and download capabilities.

## Getting Started

### Prerequisites

- Node.js 24 or later — use a version manager (e.g. fnm, nvm) with the `.nvmrc` file.

### Installation

1. **Clone the repository:**

```bash
# SSH
git clone git@github.com:aodn/ocean-current-frontend.git
# HTTPS
git clone https://github.com/aodn/ocean-current-frontend.git
```

2. **Navigate to the project directory:**

```bash
cd ocean-current-frontend
```

3. **Duplicate `.env.local.example` file and rename to `.env.local`:**

```bash
cp .env.local.example .env.local
```

4. **Enable Yarn via [Corepack](https://nodejs.org/api/corepack.html) (bundled with Node.js):**

```bash
corepack enable
```

5. **Install the project dependencies:**

```bash
yarn install
```

6. **Run the app in dev mode:**

```bash
yarn dev
```

This will start the project on a local server, which can be accessed via <http://localhost:5173/>.
Note: `5173` is Vite's default local dev server port. If you want to use a different port, you can change it in your `.env.local` file at the `VITE_PORT` variable.

To log proxy requests in the terminal, run:

```bash
yarn dev:log
```

Or set `VITE_PROXY_LOG=true` in your `.env.local` to enable it persistently.

### Environment Variables

All environment variables are optional except `VITE_MAPBOX_ACCESS_TOKEN`. See `.env.local.example` for the full list with descriptions.

#### API & Proxy

In development, all API requests go through the Vite dev server proxy:

| Path        | Forwards to                                       |
| ----------- | ------------------------------------------------- |
| `/api/v1`   | `VITE_API_BACKEND_URL` (default: edge upstream)   |
| `/resource` | `VITE_API_EC2_PROXY_URL` (default: edge upstream) |
| `/storage`  | `VITE_API_S3_PROXY_URL` (default: edge upstream)  |

In production, all paths are resolved relative to the deployment host — no environment variables are needed.

### Configuration

- .eslintrc.js for linting rules
- tailwind.config.js for Tailwind CSS configuration
- vite.config.ts for Vite build tool configuration.
  - vite-plugin-checker for output warning on browser and terminal. [Check this link for detail configuration.](https://vite-plugin-checker.netlify.app/)
- tsconfig.json for TypeScript configuration

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch naming, commit conventions, and the
git worktree workflow used in this project.

## More information

### ADR

An architecture decision record (ADR) is a document that captures an important architecture decision made along with its context and consequences.
If you want more info about this you can check [this link](https://github.com/joelparkerhenderson/architecture-decision-record?tab=readme-ov-file).
