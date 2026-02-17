# AGENTS.md

This document describes how AI coding agents should work in this repository.

## Project Overview

- Next.js 14 App Router with TypeScript
- Tailwind CSS + shadcn/ui for styling
- Sanity CMS for content management
- Resend for transactional email
- AWS Amplify for hosting
- Playwright for E2E testing

## Code Conventions

- Use TypeScript **strict mode** and keep types accurate (avoid `any` unless unavoidable).
- Prefer **named exports** over default exports.
- Components in **PascalCase**; utilities/functions in **camelCase**.
- Use path aliases: `@/` maps to `src/`.
- Build **mobile-first** and scale up with responsive breakpoints.
- Favor modular, reusable components and small, composable utilities.
- Keep comments minimal; only add them when logic is non-obvious.
- Don’t add new dependencies unless it’s the best/standard solution or saves significant time.

## Testing Requirements

- Jest/Vitest for unit tests.
- React Testing Library for component tests.
- Playwright for E2E tests.
- Target **80%+** coverage.
- Place test files next to source as `*.test.ts` / `*.test.tsx`.

When running commands, follow the repo’s package manager:

- If `pnpm-lock.yaml` exists: use `pnpm`.
- If `yarn.lock` exists: use `yarn`.
- If `package-lock.json` exists: use `npm` (prefer `npm ci` in CI).
- If no lockfile exists, do not introduce one unless requested; use whatever the project adopts.

## Commit Convention

- Format: `C2C-XXX: Brief description`
- Keep commits meaningful and atomic (one logical change per commit).
- Feature branches: `feature/C2C-XXX-short-name`

## Design System

- Slate color palette; `slate-950` as the default background.
- Fonts: **Inter** for body, **DM Sans** for headings.
- Dark theme by default.
- Use tokenized colors with a **50–950** scale.

## Architecture

- App Router file-based routing.
- Server Components by default.
- Use Client Components only when interactivity is required.
- Sanity is the source of truth for all CMS content.
- No database: forms send email via Resend (keep email sending server-side; never expose keys).

## Important Notes

- Not a commercial brand: bold colors are allowed.
- Logo symbol can stand alone.
- Bilingual support: EN/ES (plan content and routing accordingly).
- Mobile + web views are required; verify responsive behavior.

