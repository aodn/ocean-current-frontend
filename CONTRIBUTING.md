# Contributing

For first-time setup (clone, env vars, install, dev server) see the
[README](./README.md#getting-started).

## Git Worktrees

This project uses [git worktrees](https://git-scm.com/docs/git-worktree) to work on
multiple branches simultaneously without context-switching. Linked worktrees live
alongside the main checkout:

```
ocean-current-frontend/                          ← main worktree (this repo)
ocean-current-frontend.worktrees/
  fix/522-some-bug/                              ← linked worktree
  feature/123-new-thing/                         ← linked worktree
```

### Creating a worktree

Use the GitLens **Worktrees** pane in VS Code (or `git worktree add`). After creating,
run `yarn install` inside the new worktree to install dependencies.

### Automatic setup

A Husky `post-checkout` hook runs `scripts/setup-worktree.sh` automatically whenever a
new worktree is created. It sets up files that are not tracked by git but are needed to
work:

| File         | Method                     | Reason                                    |
| ------------ | -------------------------- | ----------------------------------------- |
| `.env.local` | Copied from main worktree  | Each worktree may need different env vars |
| `.claude`    | Symlinked to main worktree | Shared Claude Code project settings       |
| `CLAUDE.md`  | Symlinked to main worktree | Shared AI guidance                        |

The `postinstall` script also runs setup as a fallback, so files are guaranteed to be in
place after `yarn install` regardless of hook timing.

### Running setup manually

If the hook didn't fire or you need to re-run:

```bash
# From inside the worktree
scripts/setup-worktree.sh

# From anywhere, targeting a specific worktree
scripts/setup-worktree.sh /path/to/worktree

# Force overwrite existing files (e.g. to refresh .env.local from main)
scripts/setup-worktree.sh --force
scripts/setup-worktree.sh /path/to/worktree --force
```

### Extending the setup script

To automatically provision additional files or directories into new worktrees, edit
`scripts/setup-worktree.sh`.

**Copy a file** (independent per worktree, e.g. local config):

```sh
src="$MAIN_REPO/.my-config"
dst="$CURRENT_DIR/.my-config"
if [ ! -e "$src" ]; then
  echo "  skip: .my-config (not in main worktree)" >&2
elif [ -e "$dst" ] || [ -L "$dst" ]; then
  echo "  skip: .my-config (already exists)" >&2
else
  cp "$src" "$dst"
  echo "  copied: .my-config" >&2
fi
```

**Symlink a file or directory** (shared across worktrees, e.g. shared agent definitions):

```sh
# Add to the existing loop in the script:
for item in ".claude" "CLAUDE.md" ".agents"; do
  ...
done
```

The script is idempotent — safe to run multiple times. The `--force` flag overrides the
skip-if-exists check for all items.

## Branch naming convention

Branch names follow the pattern `<prefix>/<issue-number>-<brief-description>`:

- `hotfix/` — quickly fix critical issues
- `fix/` — fix non-critical bugs
- `bugfix/` — fix non-critical bugs
- `feature/` — add, remove, or modify a feature
- `test/` — experimentation or POC
- `chore/` — maintenance (cleanup, docs, etc.)

Example: `feature/5348-navbar-date-picker`

## Making a commit

A pre-commit hook (Husky) runs on every commit:

- Linting on all staged files
- All tests
- Commit message format validation

### gitmoji

Every commit message must be prefixed with a [gitmoji](https://gitmoji.dev/). The most
commonly used ones in this project:

- 🐛 `:bug:` — fix a bug
- ✨ `:sparkles:` — introduce new features
- 💄 `:lipstick:` — add or update the UI and style files
- ✅ `:white_check_mark:` — add, update, or pass tests
- 🔥 `:fire:` — remove code or files
