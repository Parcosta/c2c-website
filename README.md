# Coast2Coast (C2C) Website

Artist website for **live modular techno** & **DJ** — Coast2Coast (C2C).

This repo is a **Next.js 14 (App Router)** project written in **TypeScript** and styled with **Tailwind CSS**. It’s designed to pair with **Sanity** for content management, **Resend** for transactional email, and **AWS Amplify** for hosting (provisioned via **AWS CDK**).

## Table of contents

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Design system](#design-system)
- [CMS (Sanity)](#cms-sanity)
- [Contributing](#contributing)

## Tech stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with a shadcn/ui-style component approach)
- **CMS**: Sanity (content management)
- **Email**: Resend (transactional email)
- **Hosting**: AWS Amplify
- **Infrastructure**: AWS CDK (`infra/`)
- **Testing**
  - **E2E**: Playwright
  - **Unit/component**: Vitest + React Testing Library

## Getting started

```bash
git clone https://github.com/Parcosta/c2c-website.git
cd c2c-website

npm install

cp .env.example .env.local
# Fill in environment variables

npm run dev
```

Then open `http://localhost:3000`.

Notes:
- If you want fully reproducible installs (recommended in CI), use `npm ci` instead of `npm install`.

## Environment variables

All required environment variables are listed in `.env.example`.

### Public (safe to expose to the browser)

- **`NEXT_PUBLIC_SANITY_PROJECT_ID`**: Your Sanity project ID.
- **`NEXT_PUBLIC_SANITY_DATASET`**: Sanity dataset name (commonly `production`).

### Server-only (keep secret)

- **`SANITY_API_TOKEN`**: A Sanity API token used for server-side content operations. Do not expose this to client components.
- **`SANITY_WEBHOOK_SECRET`**: Secret used to validate Sanity webhooks for on-demand ISR revalidation (`/api/revalidate`).
- **`RESEND_API_KEY`**: Resend API key used for sending email from server-side routes/actions.

Notes:
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser by Next.js.
- In AWS Amplify (via CDK), these values are configured as Amplify environment variables and are sourced from AWS SSM Parameter Store (see [Deployment](#deployment)).

## Project structure

High-level layout:

```text
.
├─ src/
│  ├─ app/                 # Next.js App Router routes, layouts, global styles
│  ├─ components/          # Reusable UI components (layout primitives, etc.)
│  ├─ lib/                 # Shared utilities (e.g. className merging)
│  └─ styles/              # Design tokens and styling constants
├─ e2e/                    # Playwright end-to-end tests
├─ infra/                  # AWS CDK app for Amplify + env wiring
├─ amplify.yml             # Amplify build spec (also mirrored in CDK stack)
└─ .env.example            # Required env vars template
```

`src/` details:

- **`src/app/`**
  - `layout.tsx`: root layout, fonts, and baseline page chrome
  - `globals.css`: global Tailwind layer/styles
  - `page.tsx`: current homepage (design system foundation content)
- **`src/components/`**
  - `layout/Container.tsx`, `layout/Section.tsx`: layout primitives
  - `layout/__tests__/`: component tests (React Testing Library + Vitest)
- **`src/lib/`**
  - `utils.ts`: shared helpers (e.g. `cn()` for Tailwind class merging)
- **`src/styles/`**
  - `tokens.ts`: tokenized colors/spacing/typography

## Scripts

Root scripts (run from the repo root):

- **`npm run dev`**: Start the Next.js dev server.
- **`npm run build`**: Production build.
- **`npm run start`**: Start the production server (after build).
- **`npm run lint`**: Lint with Next.js ESLint config.
- **`npm test`**: Run unit/component tests (Vitest).
- **`npm run test:e2e`**: Run Playwright E2E tests.

Additional useful scripts:

- **`npm run e2e`**: Alias for `npm run test:e2e`.
- **`npm run e2e:ui`**: Run Playwright with UI mode.
- **`npm run test:run`**: Run Vitest in CI mode (`vitest run`).
- **`npm run format`**: Format with Prettier.

Infrastructure scripts (run from `infra/`):

```bash
cd infra
npm ci
npm run synth
```

## Deployment

### AWS Amplify (via CDK)

Infrastructure lives in `infra/` and provisions an Amplify app using AWS CDK (v2).

Key behavior (from `infra/lib/amplify-stack.ts`):
- Creates an Amplify app with **WEB_COMPUTE** platform.
- Connects to GitHub via a Secrets Manager secret name (default: `github/token`).
- Configures Amplify environment variables:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` (SSM String Parameter)
  - `NEXT_PUBLIC_SANITY_DATASET` (SSM String Parameter)
  - `SANITY_API_TOKEN` (SSM SecureString)
  - `RESEND_API_KEY` (SSM SecureString)
- Adds a `main` branch as **PRODUCTION** and optionally maps a custom domain.

To deploy infra (example):

```bash
cd infra
npm ci

# Provide GitHub repo config via context or environment variables:
# - context: -c githubOwner=... -c githubRepo=...
# - env: GITHUB_OWNER / GITHUB_REPO
npx cdk deploy -c githubOwner=Parcosta -c githubRepo=c2c-website
```

Infra configuration inputs:
- **GitHub repo**
  - context `githubOwner` / `githubRepo` (or env `GITHUB_OWNER` / `GITHUB_REPO`)
  - context `githubTokenSecretName` (or env `GITHUB_TOKEN_SECRET_NAME`, default `github/token`)
- **SSM parameter names** (override via CDK context if needed)
  - `NEXT_PUBLIC_SANITY_PROJECT_ID_PARAM` (default `/c2c-website/NEXT_PUBLIC_SANITY_PROJECT_ID`)
  - `NEXT_PUBLIC_SANITY_DATASET_PARAM` (default `/c2c-website/NEXT_PUBLIC_SANITY_DATASET`)
  - `SANITY_API_TOKEN_PARAM` (default `/c2c-website/SANITY_API_TOKEN`)
  - `RESEND_API_KEY_PARAM` (default `/c2c-website/RESEND_API_KEY`)
- **Domain**
  - context `customDomainName` (optional)
  - context `customDomainEnableWww` (default `false`)

### `amplify.yml` build spec

This repo includes an `amplify.yml` used by Amplify builds:

- Installs with `npm ci`
- Builds with `npm run build`
- Publishes `.next/` artifacts and caches `node_modules/` + Next.js cache

The CDK stack also defines an equivalent build spec in code.

## Design system

- **Theme**: Dark by default (`<html className="dark">`) with `slate-950` as the primary background.
- **Typography**:
  - **Inter**: body font
  - **DM Sans**: display/headings (`font-display`)
- **Tokens**: `src/styles/tokens.ts` provides tokenized colors (50–950 scale), spacing, and typography settings.
- **Components**: `src/components/` contains composable primitives (e.g. `Container`, `Section`) built for consistent layout. The project follows a shadcn/ui-style approach (small, reusable components + Tailwind utilities).

## CMS (Sanity)

- **Sanity config**: This app expects a Sanity project + dataset (see env vars above).
- **Studio**: The intended Studio route is `/studio` (commonly implemented as a separate Next.js route group or a sibling `studio/` package). If you add/enable Studio in this repo, keep the server token (`SANITY_API_TOKEN`) server-only.
- **Content types (typical for C2C)**:
  - **Site settings**: global metadata, social links, navigation
  - **Shows/events**: date, venue, city, ticket links, lineup
  - **Media**: mixes, videos, press photos
  - **Press**: quotes, articles, embeds
- **Bilingual support (EN/ES)**: Model content with localized fields (or separate documents per locale) and map to locale-aware routes (e.g. `/en`, `/es`) or a language switcher. Keep UI copy and CMS content strategy aligned.

## Contributing

- **Branch naming**: `feature/C2C-XXX-short-name`
- **Commit format**: `C2C-XXX: Brief description`
- **PR workflow**
  - Create a feature branch from `main`
  - Keep PRs focused and small
  - Ensure `npm run lint`, `npm test`, and `npm run e2e` pass before requesting review
