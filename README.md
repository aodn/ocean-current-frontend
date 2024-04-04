# Project for Ocean Current Redevelopment

Welcome to our project, aimed at redefining the user experience and accessibility of ocean current. This project is part of a broader initiative to enhance the [Ocean Current](https://oceancurrent.aodn.org.au/) website, focusing on modern UI/UX design, streamlined data download processes, and improved visualization features.

## Project Overview

- **Objective:** To enhance the user experience and accessibility of oceanographic data visualization, aligning with modern UI/UX standards, and improving the efficiency of data downloads and the quality of visualization.
- **Scope:** This includes a UI/UX redesign, transitioning Matlab processing to Python, and upgrading data visualization and download capabilities.

## Getting Started

To set up this project locally, follow these steps using Yarn and Vite for a smooth development experience.

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

3. **Duplicate `.env.local.example` file and rename to `.env.local` (some environment variables are not required, change them according to personal preference):**

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

This will start the project on a local server, typically http://localhost:5173/, and you can begin exploring the enhanced data visualization features.

### ADR

An architecture decision record (ADR) is a document that captures an important architecture decision made along with its context and consequences.
If you want more info about this you can check [this link](https://github.com/joelparkerhenderson/architecture-decision-record?tab=readme-ov-file).

### Dependencies

List of primary dependencies:

- React
- Vite
- Tailwind CSS
- ESLint
- Prettier
- Husky
- Vitest

### Configuration

- .eslintrc.js for linting rules
- tailwind.config.js for Tailwind CSS configuration
- vite.config.ts for Vite build tool configuration
- tsconfig.json for TypeScript configuration

### Branching name

- `hotfix/`: for quickly fixing critical issues,
- `usually/`: with a temporary solution
- `bugfix/`: for fixing a bug
- `feature/`: for adding, removing or modifying a feature
- `test/`: for experimenting something which is not an issue
- `wip/`: for a work in progress

And add the issue id after an `/` followed with an explanation of the task.
Example feature/5348-create-react-app
