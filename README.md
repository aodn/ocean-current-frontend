# Project for Ocean Current Redevelopment

Welcome to our project, aimed at redefining the user experience and accessibility of ocean current. This project is part of a broader initiative to enhance the [Ocean Current](https://oceancurrent.aodn.org.au/) website, focusing on modern UI/UX design, streamlined data download processes, and improved visualisation features.

## Project Overview

- **Objective:** To enhance the user experience and accessibility of oceanographic data visualisation, aligning with modern UI/UX standards, and improving the efficiency of data downloads and the quality of visualisation.
- **Scope:** This includes a UI/UX redesign, transitioning Matlab processing to Python, and upgrading data visualisation and download capabilities.

## Getting Started

### Prerequisites

- Node.js installed on your system with version 18.19.1 or superior (you can use [nvm](https://github.com/nvm-sh/nvm) for changing the node version).
- Yarn 4.1.0

### Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
```

2. **Navigate to the project directory:**

```bash
cd ocean-current-frontend
```

3. **Duplicate `.env.local.example` file and rename to `.env.local`:**

```bash
cp .env.local.example .env.local
```

4. **Install the project dependencies:**

```bash
yarn install
```

5. **Run the app in dev mode:**

```bash
yarn dev
```

This will start the project on a local server, typically http://localhost:3000/.

### Branch naming convention

In this project, the branch naming convention is as follow: `<branch prefix>/<github issue number>-<brief description of the issue>`.

We use the following branch prefixes to categorise the work for each branch:

- `hotfix/`: for quickly fixing critical issues
- `bugfix/`: for fixing a bug
- `feature/`: for adding, removing or modifying a feature
- `test/`: for experimentation, such as coming up with a working POC or testing an impplementation
- `chore/`: literally a chore, such as code clean up, documentation updates, etc.

Example branch name: `feature/5348-navbar-date-picker`.

### Making a commit

A pre-commit hook has been set up using Husky which will run the following on every commit:

- linting on all staged files
- all tests
- checks that the commit message is prefixed with [gitmoji](https://gitmoji.dev/)

#### gitmoji

`gitmoji` is used in this project to categorise the context or intention of each commit for easy identification.

Every commit message must be prefixed with `gitmoji` either by using markdown directly in the commit message or `gitmoji's` interactive cli, [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli).

The full list of available emojis and their interpretations are available on [gitmoji.dev](https://gitmoji.dev/), with the most commonly used ones in this project listed below:

- 🐛 :bug: - fix a bug
- 🔥 :fire: - remove code or files
- ✨ :sparkles: - introduce new features
- 💄 :lipstick: - add or update the UI and style files
- ✅ :white_check_mark: - add, update, or pass tests

### Configuration

- .eslintrc.js for linting rules
- tailwind.config.js for Tailwind CSS configuration
- vite.config.ts for Vite build tool configuration.
  - vite-plugin-checker for output warning on browser and terminal. [Check this link for detail configuration.](https://vite-plugin-checker.netlify.app/)
- tsconfig.json for TypeScript configuration

## More information

### ADR

An architecture decision record (ADR) is a document that captures an important architecture decision made along with its context and consequences.
If you want more info about this you can check [this link](https://github.com/joelparkerhenderson/architecture-decision-record?tab=readme-ov-file).
