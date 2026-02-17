# CMS Training (Sanity Studio)

This guide explains how to manage site content in **Sanity Studio**, including bilingual fields (EN/ES), images, and publishing.

## Accessing the Studio

- **Studio URL**: open `https://<your-site-domain>/studio` (or `http://localhost:3000/studio` in dev).
- **Login**: sign in with your Sanity account (the one invited to the project).

If you can’t access Studio, you likely don’t have access to the Sanity project/dataset configured for this environment.

## Studio basics

- **Desk (left sidebar)**: content types (documents) such as *Portfolio item*, *Event*, *Service*, *Press item*, *Press / EPK page*, *Site settings*.
- **List view**: shows existing documents of that type.
- **Editor view**: fields for the selected document.
- **Draft vs Published**
  - Editing creates a **draft**.
  - The website only updates after you **Publish** (unless a preview mode is explicitly enabled).

## Bilingual fields (EN/ES)

Most public-facing fields are localized. In the editor you’ll see fields grouped into:

- **English** (`en`)
- **Español** (`es`)

### What must be filled in both languages

If a localized field is blank for a language, the site may render that content as empty for that locale (there is no guaranteed fallback).

### Localized slugs (URLs)

Several document types use **localized slugs**, meaning URLs can differ between English and Spanish:

- `page.slug` (localized)
- `portfolioItem.slug` (localized)

Best practices:

- Generate the slug from the matching language title, then edit for readability.
- Keep slugs stable after publishing (changing a slug changes the URL).

Important note for the homepage:

- The homepage lookup expects a `page` with slug **`home`** for the active locale.
- To keep both languages working, set **both** `slug.en` and `slug.es` to **`home`** for the homepage document.

## Image & file management

### Uploading and selecting

Most image fields let you either upload a new image or select an existing one from the asset library.

### Hotspot / crop

Images are configured with **hotspot** enabled. After uploading, set the focal point so the subject stays centered across different responsive crops.

### Order matters (arrays)

Some fields are image arrays (for example, Portfolio images). The site may use the **first** image as the default or fallback, so put the best/primary image first.

### Video and PDFs

- Portfolio “Featured media” can be **one** item: either an image or a **video file**.
- The Press / EPK page supports uploading **PDF files** (Tech rider, Stage plot).

## Publishing workflow (recommended)

- **Create/Edit** content and review both EN and ES fields.
- **Publish** when ready.
- If you need to undo changes:
  - Use the document’s **history** to find and restore prior versions, or
  - Revert the draft before publishing.

Avoid deleting documents that are already referenced/linked on the site unless you’re sure they’re no longer needed.

## Managing Portfolio items

Content type: **Portfolio item** (`portfolioItem`)

Used by:

- Portfolio listing: `/<locale>/portfolio`
- Portfolio detail: `/<locale>/portfolio/<slug>`

### Create a new Portfolio item

1. In Desk, open **Portfolio item**.
2. Click **Create**.
3. Fill in:
   - **Title (EN/ES)**: required for display.
   - **Slug (EN/ES)**: required for the detail page URL.
   - **Category (EN/ES)**: optional label shown with the item.
   - **Description (EN/ES)**: rich text (headings, links, lists supported).
   - **Date**: controls sorting (newest first).
   - **Tags**: optional, used for filtering/labeling (plain strings).
4. Add media:
   - **Images**: add one or more images (put the best image first).
   - **Featured media (optional)**: add **one** image or video. If omitted, the first image is used as a fallback for “featured” placements.
5. Click **Publish**.

### Editing an existing Portfolio item

- Open the item from the list, make changes, then **Publish** again.
- If you update the slug after publishing, any existing links/bookmarks to the old URL will break.

## Managing Events

Content type: **Event** (`event`)

Events are sorted by **date (newest first)**, so the Date field is important.

### Create or edit an Event

1. Open **Event** in Desk and click **Create** (or select an existing event).
2. Fill in:
   - **Title (EN/ES)**
   - **Date**
   - **Venue (EN/ES)**
   - **City (EN/ES)**
   - **Country (EN/ES)**
   - **Ticket URL** (optional, but recommended when available)
   - **Flyer** (optional image)
3. **Publish**.

## Updating Services

Content type: **Service** (`service`)

Services are sorted by **English title (A–Z)**.

### Create or edit a Service

1. Open **Service** in Desk and click **Create** (or select an existing service).
2. Fill in:
   - **Title (EN/ES)**
   - **Description (EN/ES)** (short paragraph text)
   - **Pricing (EN/ES)** (optional label like “Starting at…”, “Custom quote”)
   - **Icon**: a string identifier (typically a Lucide icon name)
   - **Features**: a list of localized feature lines (each entry has EN/ES)
3. **Publish**.

## Adding Press items (mentions)

Content type: **Press item** (`pressItem`)

Press items are sorted by **date (newest first)**.

### Create a Press item

1. Open **Press item** in Desk and click **Create**.
2. Fill in:
   - **Title (EN/ES)**: article/interview title
   - **Publication (EN/ES)**: source name (magazine/site)
   - **Date**
   - **URL**: link to the mention
   - **Quote (EN/ES)** (optional)
   - **Image** (optional)
3. **Publish**.

## Managing the Press / EPK page

Content type: **Press / EPK page** (`pressPage`)

This is intended as a single “EPK” style page. Keep only **one** Press / EPK page document unless the site is updated to support multiples.

### What you can update

- **Title (EN/ES)**
- **Bio (EN/ES)** (rich text)
- **Press photos**: a list of items, each with:
  - **Title (EN/ES)**
  - **Image**
- **Press kit assets**: downloadable files, each with:
  - **Title (EN/ES)**
  - **File**
- **Tech rider (PDF)** and **Stage plot (PDF)**
- **Bookings email / phone**
  - Email can override global site settings (if left blank, the site can fall back to the contact email).
- **SEO** (optional): title/description/image (EN/ES where applicable)

Publish after updates.

## Managing Site settings

Content type: **Site settings** (`siteSettings`)

This should be treated as a singleton (only **one** document).

### Fields

- **Site name (EN/ES)**
- **Logo** (image)
- **Social links**: list entries with:
  - **Platform** (choose from the predefined list)
  - **URL**
- **Contact email**

After changes, **Publish**.

## Quick “content not showing” checklist

- Is the document **Published** (not just saved as a draft)?
- Did you fill the field for the correct **language** (EN vs ES)?
- For pages/portfolio items, is the **slug** filled for that locale?
- Is the **Date** set correctly (sorting might make items appear “missing”)?

