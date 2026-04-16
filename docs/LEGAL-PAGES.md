# Legal Pages (Sanity)

This document describes the `legalPage` document type in Sanity, which stores Privacy Policy and Terms of Service content.

## Overview

The `legalPage` document type stores legal content that was previously hardcoded in the application. Each legal page (Privacy Policy, Terms of Service) is a separate document with structured sections.

**Location in Studio:** Desk → Legal pages

## Structure

### Fields

- **title**: Page title (e.g., "Privacy Policy", "Terms of Service")
- **slug**: URL slug (e.g., "privacy-policy", "terms")
- **subtitle**: Page subtitle or last updated label
- **lastUpdatedLabel**: Label for the last updated date (e.g., "Last updated:")
- **lastUpdated**: Date of last update
- **intro**: Introduction paragraph
- **sections**: Array of content sections
- **seo**: SEO metadata (title, description, image)

### Section Structure

Each section in the `sections` array contains:

- **heading**: Section heading
- **body**: Array of content blocks

### Content Block Types

Each body block can be one of:

1. **Paragraph** (`type: "p"`)
   - **text**: Paragraph text

2. **Bullet list** (`type: "ul"`)
   - **items**: Array of list item strings

3. **Numbered list** (`type: "ol"`)
   - **items**: Array of list item strings

4. **Paragraph with links** (`type: "pWithLinks"`)
   - **text**: Full paragraph text
   - **parts**: Array of link objects with `text` and `href`

## Example: Privacy Policy Structure

```
title: "Privacy Policy"
slug: "privacy-policy"
subtitle: "How we collect, use, and protect your personal data."
lastUpdatedLabel: "Last updated"
lastUpdated: "2026-01-15"
intro: "This Privacy Policy explains how we handle your data..."
sections:
  - heading: "Who we are"
    body:
      - type: "p"
        text: "This website is operated by Coast2Coast (C2C)..."
  - heading: "Personal data we collect"
    body:
      - type: "ul"
        items:
          - "Contact data: name, email..."
          - "Technical data: IP address..."
  - heading: "Your rights"
    body:
      - type: "p"
        text: "Depending on your location, you may have rights..."
      - type: "ul"
        items:
          - "Access, rectification, and deletion"
          - "Data portability"
```

## Creating Legal Pages

### Privacy Policy

1. In Studio, go to **Legal pages**
2. Click **Create new**
3. Set:
   - **Title**: "Privacy Policy" (EN) / "Política de privacidad" (ES)
   - **Slug**: `privacy-policy` for both EN and ES
   - Fill in all sections with bilingual content
4. **Publish**

### Terms of Service

1. In Studio, go to **Legal pages**
2. Click **Create new**
3. Set:
   - **Title**: "Terms of Service" (EN) / "Términos de servicio" (ES)
   - **Slug**: `terms` for both EN and ES
   - Fill in all sections with bilingual content
4. **Publish**

## URL Routing

Legal pages are accessed at:
- English: `/en/privacy-policy`, `/en/terms`
- Spanish: `/es/privacy-policy`, `/es/terms`

The slug field determines the URL path.

## Migration from Hardcoded Content

If migrating from hardcoded legal content:

1. Copy the existing English content into the EN fields
2. Translate to Spanish for the ES fields
3. Structure the content into sections with appropriate block types
4. Set the lastUpdated date to today
5. Publish

## Important Notes

1. **Both languages required** - Fill EN and ES for all fields
2. **Slug must match** - Use the same slug for both languages
3. **Sections are ordered** - They appear in the order you create them
4. **SEO fields optional** - But recommended for better search visibility
