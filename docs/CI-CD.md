# CI/CD Pipeline

This project uses GitHub Actions for continuous integration. The workflow runs on every push to `main` and on all pull requests targeting `main`.

## Workflow Overview

The pipeline is defined in `.github/workflows/ci.yml` and consists of seven jobs:

```
lint ─────────┐
prettier ─────┤
typecheck ────┤  (run in parallel)
unit-tests ───┤
build ────────┘
                ├─► e2e-tests  (needs: build)
                └─► coverage   (needs: unit-tests)
```

### Jobs

| Job            | Description                                         | Depends On |
| -------------- | --------------------------------------------------- | ---------- |
| **lint**       | Runs ESLint across the codebase                     | —          |
| **prettier**   | Checks formatting with Prettier                     | —          |
| **typecheck**  | Runs `tsc --noEmit` for type safety                 | —          |
| **unit-tests** | Runs Vitest with coverage via `@vitest/coverage-v8` | —          |
| **build**      | Builds the Next.js application                      | —          |
| **e2e-tests**  | Runs Playwright against Chromium                    | build      |
| **coverage**   | Uploads coverage reports to Codecov                 | unit-tests |

### Parallelism

The first five jobs (`lint`, `prettier`, `typecheck`, `unit-tests`, `build`) run in parallel. `e2e-tests` waits for `build` to finish so the application can be started from a known-good state. `coverage` waits for `unit-tests` to produce the coverage artifacts.

## Required Status Checks

Configure these as required status checks in your branch protection rules:

1. `ESLint`
2. `Prettier`
3. `Type Check`
4. `Unit Tests`
5. `Build`
6. `E2E Tests`

## Concurrency

The workflow uses concurrency groups scoped to the workflow name and Git ref. If a new commit is pushed while a run is in progress on the same branch, the older run is cancelled automatically.

## Artifacts

| Artifact             | Contents                             | Retention |
| -------------------- | ------------------------------------ | --------- |
| `unit-test-coverage` | Vitest coverage output (`coverage/`) | 14 days   |
| `nextjs-build`       | Next.js build output (`.next/`)      | 7 days    |
| `e2e-test-results`   | Playwright report and screenshots    | 14 days   |

## Secrets

The workflow requires the following repository secrets:

| Secret                          | Purpose                                |
| ------------------------------- | -------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID for the build step   |
| `NEXT_PUBLIC_SANITY_DATASET`    | Sanity dataset name for the build step |
| `CODECOV_TOKEN`                 | _(Optional)_ Token for Codecov upload  |

## Dependabot

Automated dependency updates are configured in `.github/dependabot.yml`:

- **npm dependencies** are checked weekly (Mondays) with grouped updates for related packages (Next.js, React, testing, Tailwind, Sanity).
- **GitHub Actions** versions are checked weekly to keep CI actions up to date.

## Running Checks Locally

```bash
npm run lint           # ESLint
npx prettier --check . # Prettier (check mode)
npx tsc --noEmit       # TypeScript
npm run test:run       # Unit tests (no coverage)
npx vitest run --coverage  # Unit tests with coverage
npm run build          # Next.js build
npm run e2e            # Playwright E2E tests
```

## Adding a New Check

1. Add the script to `package.json`.
2. Add a new job to `.github/workflows/ci.yml` following the existing pattern.
3. If the check should block merges, add its job name to the required status checks in branch protection settings.
4. Update this document.
