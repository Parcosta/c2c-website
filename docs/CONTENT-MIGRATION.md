# Content migration (Sanity)

This repo uses Sanity as the source of truth for content, with the Studio embedded at `"/studio"` (Next.js App Router). This guide documents the content model, provides sample import files, and outlines a repeatable migration workflow.

## Prerequisites

- A Sanity project + dataset (recommended: use a dedicated dataset like `staging` for imports).
- Environment variables set for local development:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET` (e.g. `staging` or `production`)
- Sanity CLI access (either logged in via `npx sanity login` or using a token via `SANITY_AUTH_TOKEN`).

## Content types needed

These are the document types currently used by the app (see `src/sanity/schemas`):

- `siteSettings` (**required**): global site name, contact email, social links, logo
- `page` (**required** for site pages): used for the homepage and any routed pages
  - The homepage query expects a `page` with slug `home` (localized), i.e. `slug.en.current == "home"`
- `portfolioItem`: portfolio/gallery entries
- `event`: events list entries
- `service`: services offered
- `pressItem`: press/mentions list entries

### Localization shape (EN/ES)

Most public-facing strings are localized using objects with `en` and `es` fields:

- `localeString`: `{ en?: string, es?: string }`
- `localeText`: `{ en?: string, es?: string }`
- `localeSlug`: `{ en?: { current: string }, es?: { current: string } }`
- `localeBlockContent`: `{ en?: PortableText[], es?: PortableText[] }`

## Sample content (import files)

Sample import files live in `docs/sample-content/` and are provided as **NDJSON** (newline-delimited JSON), which is the format expected by Sanity’s dataset import.

- `docs/sample-content/portfolio-items.ndjson`
- `docs/sample-content/events.ndjson`
- `docs/sample-content/services.ndjson`
- `docs/sample-content/press-items.ndjson`
- `docs/sample-content/site-settings.ndjson`

Notes:

- Image fields are intentionally omitted in the sample files to keep imports simple and deterministic. Add images later via Studio upload, or by creating assets first and referencing their `_ref` IDs.
- `siteSettings` is included as a singleton-like document with `_id: "siteSettings"` so it’s easy to find/update.

## Importing via Sanity CLI

### 1) Install dependencies

```bash
npm install
```

### 2) Set project + dataset

```bash
export NEXT_PUBLIC_SANITY_PROJECT_ID="yourProjectId"
export NEXT_PUBLIC_SANITY_DATASET="staging"
```

If the dataset doesn’t exist yet, create it:

```bash
npx sanity dataset create "$NEXT_PUBLIC_SANITY_DATASET"
```

### 3) Authenticate

Interactive login:

```bash
npx sanity login
```

Or use a token (useful in CI):

```bash
export SANITY_AUTH_TOKEN="sanity_api_token_with_write_access"
```

### 4) Import sample content

Import each file into the configured dataset:

```bash
npx sanity dataset import docs/sample-content/site-settings.ndjson "$NEXT_PUBLIC_SANITY_DATASET"
npx sanity dataset import docs/sample-content/services.ndjson "$NEXT_PUBLIC_SANITY_DATASET"
npx sanity dataset import docs/sample-content/portfolio-items.ndjson "$NEXT_PUBLIC_SANITY_DATASET"
npx sanity dataset import docs/sample-content/events.ndjson "$NEXT_PUBLIC_SANITY_DATASET"
npx sanity dataset import docs/sample-content/press-items.ndjson "$NEXT_PUBLIC_SANITY_DATASET"
```

If you are importing into an empty dataset and want a clean reset each run, you can add `--replace` (this deletes existing documents in the dataset):

```bash
npx sanity dataset import docs/sample-content/site-settings.ndjson "$NEXT_PUBLIC_SANITY_DATASET" --replace
```

### 5) Verify in Studio

Run the app, then open Studio at `"/studio"`:

```bash
npm run dev
```

## Migration checklist

- **Sanity project**
  - Create/confirm Sanity project ID
  - Create datasets (`staging` recommended for trial imports)
  - Ensure you can access Studio at `"/studio"`
- **Global settings**
  - Create exactly one `siteSettings` document
  - Set `siteName` (EN/ES), `contactEmail`, and `socialLinks`
  - Upload and set `logo` (optional but recommended)
- **Pages**
  - Create a `page` for the homepage with `slug.en.current = "home"` (and `slug.es.current` as desired)
  - Add `hero` and `seo` fields as needed (images optional)
- **Portfolio**
  - Add `portfolioItem` documents with title/category/description (EN/ES), dates, and tags
  - Upload images and attach to `images` when ready
- **Events**
  - Add `event` documents with venue/city/country (EN/ES), date, and `ticketUrl`
  - Upload optional flyers later
- **Services**
  - Add `service` documents with title/description/features (EN/ES) and an `icon` identifier
- **Press**
  - Add `pressItem` documents with publication/title/quote (EN/ES), date, and URL
  - Upload optional images later
- **App verification**
  - Confirm frontend pages load with localized content for both locales
  - Confirm lists render (portfolio/events/services/press) and sort correctly by date/title

