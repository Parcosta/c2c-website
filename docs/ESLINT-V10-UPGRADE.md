# ESLint v10 Upgrade — Deferred

**Status:** Blocked on upstream. Stay on `eslint@^9.x` until further notice.

## Why we can't upgrade yet

ESLint v10 (released 2026-02-06) removed deprecated context APIs (`context.getFilename()`, `context.getSourceCode()`, etc.) and requires any custom `ScopeManager` to implement a new `addGlobals()` method. Our lint setup runs through `eslint-config-next`, which transitively pulls in several plugins that have not yet published v10-compatible releases.

As of the last review, the blockers are:

| Plugin (bundled by `eslint-config-next`) | v10 compatible?    | Upstream tracking                                                            |
| ---------------------------------------- | ------------------ | ---------------------------------------------------------------------------- |
| `eslint-plugin-react`                    | No (7.37.5 latest) | [PR #3979](https://github.com/jsx-eslint/eslint-plugin-react/pull/3979)      |
| `eslint-plugin-import`                   | No (2.32.0 latest) | [Issue #3227](https://github.com/import-js/eslint-plugin-import/issues/3227) |
| `eslint-plugin-jsx-a11y`                 | No (6.10.2 latest) | peer dep still `^9`                                                          |
| `eslint-plugin-react-hooks`              | Yes                | —                                                                            |
| `@typescript-eslint/*`                   | Yes (8.54+)        | —                                                                            |

Symptoms when forcing the upgrade: `TypeError: contextOrFilename.getFilename is not a function` from `eslint-plugin-react/lib/util/version.js` on first lint run.

## What to do with dependabot PRs

- **Close** dependabot's `eslint@10.x` PRs without merging. Leave a comment linking here.
- Keep `eslint` pinned to `^9.x` in `package.json`.

## When to revisit

Re-attempt the upgrade once either:

1. `eslint-config-next` ships a release whose peer deps allow `eslint@^10`, or
2. `eslint-plugin-react` and `eslint-plugin-import` both publish stable v10-compatible releases.

Quick check from the repo root:

```sh
npm view eslint-plugin-react peerDependencies.eslint
npm view eslint-plugin-import peerDependencies.eslint
```

When both include `^10`, reopen this task, rebase dependabot's next v10 PR, run `npm install && npm run lint`, and address any remaining breaking changes per the [ESLint v10 migration guide](https://eslint.org/docs/latest/use/migrate-to-10.0.0).
