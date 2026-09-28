## What to review

Focus on the lines this pull request changes and their direct blast radius.
Do not review unrelated pre-existing code. Report, in priority order:

1. **Bugs** — logic errors, wrong conditions, off-by-one, null/undefined
   handling, error handling, concurrency or async mistakes, resource leaks.
2. **Regressions** — behaviour, API or data contracts the change breaks for
   existing callers, consumers or users.
3. **Security** — injection, unsafe deserialisation or HTML, secrets committed
   to the repository, missing authorisation or input validation, unsafe
   handling of untrusted data.
4. **Missing tests** — changed behaviour or bug fixes without matching test
   coverage, or tests that no longer exercise what they claim to.
5. **Duplication** — new functions, hooks, components, constants or types that
   re-implement something that already exists in the codebase (search
   `src/utils/`, `src/hooks/`, `src/components/Shared/`, `src/constants/`,
   `src/services/` and the stores), or logic copied between files in the PR
   instead of shared. Name the existing code the PR should reuse, with its
   file and line, and say whether it can be used as is or needs a small
   change. Only report it when the behaviour really matches, not when the
   two only look alike.

Mention readability, maintainability and repository conventions only when they
are likely to cause a real problem. Skip pure style nits that a linter or
formatter would catch.

## How to judge

- Only report issues you can support with evidence from the diff or the code
  you read. Read the relevant code before claiming something is broken.
- If you are unsure, either verify it by reading more code or leave it out. A
  few high-confidence findings are worth more than a long speculative list.
- Every finding must point at a specific file and line in the PR head.
- Only review changes that are in the diff. The checkout is at the PR head, so
  files you read must match the right-hand side of the diff. If a file
  contradicts the diff, do not explain it away: report the mismatch as a
  finding, because the review context may be wrong.
- It is fine to report no findings.
