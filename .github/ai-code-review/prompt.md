## Repository-specific review direction

Describe only risks, architecture boundaries or kinds of changed code that
need special attention in this repository. The shared workflow already adds
the general review priorities, evidence requirements, output format and the
duplicate-implementation check; the reuse locations for that check are below
in the repository-specific guidance.

Pay particular attention to new React components, hooks, Zustand store
actions and TanStack Query hooks: these are the places most likely to
re-implement something that already exists in this codebase.
