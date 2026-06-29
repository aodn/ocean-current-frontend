#!/usr/bin/env sh
# Sets up shared config files from the main worktree into the current worktree.
# .env.local is copied (so each worktree can have its own env vars).
# .claude and CLAUDE.md are symlinked (shared project settings).
# Safe to run multiple times (idempotent).
#
# Usage: setup-worktree.sh [worktree-path] [--force|-f]
#   --force / -f  Overwrite existing files/symlinks

FORCE=false
WORKTREE_ARG=""
for arg in "$@"; do
  case "$arg" in
    --force|-f) FORCE=true ;;
    *) WORKTREE_ARG="$arg" ;;
  esac
done

echo "Setting up worktree config files..." >&2
COMMON_DIR=$(git rev-parse --git-common-dir 2>/dev/null)
[ -z "$COMMON_DIR" ] && echo "Not a git repo" >&2 && exit 1

COMMON_DIR=$(cd "$COMMON_DIR" && pwd)
MAIN_REPO=$(dirname "$COMMON_DIR")
CURRENT_DIR="${WORKTREE_ARG:-$(pwd)}"

if [ "$CURRENT_DIR" = "$MAIN_REPO" ]; then
  echo "Already in main worktree, nothing to do." >&2
  exit 0
fi

echo "Worktree: $CURRENT_DIR" >&2
echo "Main:     $MAIN_REPO" >&2

# Copy .env.local so each worktree can have independent env vars
src="$MAIN_REPO/.env.local"
dst="$CURRENT_DIR/.env.local"
if [ ! -e "$src" ]; then
  echo "  skip: .env.local (not in main worktree)" >&2
elif [ -e "$dst" ] || [ -L "$dst" ]; then
  if [ "$FORCE" = true ]; then
    rm -f "$dst" && cp "$src" "$dst"
    echo "  force copied: .env.local" >&2
  else
    echo "  skip: .env.local (already exists)" >&2
  fi
else
  cp "$src" "$dst"
  echo "  copied: .env.local" >&2
fi

# Symlink .claude and CLAUDE.md so project settings stay in sync across worktrees
for item in ".claude" "CLAUDE.md"; do
  src="$MAIN_REPO/$item"
  dst="$CURRENT_DIR/$item"
  if [ ! -e "$src" ] && [ ! -L "$src" ]; then
    echo "  skip: $item (not in main worktree)" >&2
  elif [ -e "$dst" ] || [ -L "$dst" ]; then
    if [ "$FORCE" = true ]; then
      rm -rf "$dst" && ln -s "$src" "$dst"
      echo "  force linked: $item -> $src" >&2
    else
      echo "  skip: $item (already exists)" >&2
    fi
  else
    ln -s "$src" "$dst"
    echo "  linked: $item -> $src" >&2
  fi
done
