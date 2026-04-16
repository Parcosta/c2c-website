# Site Labels (Sanity)

This document describes the `siteLabels` document type in Sanity, which contains all static UI labels that were previously managed via i18next translation files.

## Overview

The `siteLabels` document is a **singleton** (only one instance) that stores all user-facing text labels for the site. This includes navigation, buttons, form labels, page titles, and cookie consent text.

**Location in Studio:** Desk → Site labels

## Structure

### Brand

- **brand**: Site brand name (e.g., "Coast2Coast")

### Navigation

All navigation labels:

- **primaryAriaLabel**: ARIA label for main navigation
- **mobileAriaLabel**: ARIA label for mobile navigation
- **footerAriaLabel**: ARIA label for footer navigation
- **home**: "Home" link text
- **portfolio**: "Portfolio" link text
- **services**: "Services" link text
- **press**: "Press" link text
- **about**: "About" link text
- **contact**: "Contact" link text
- **booking**: "Booking" link text
- **privacyPolicy**: "Privacy Policy" link text
- **terms**: "Terms" link text
- **mobileMenu**: Mobile menu button text
- **close**: Close button text

### Language Switcher

- **switchToEnglish**: "Switch to English" text
- **switchToSpanish**: "Switch to Spanish" text

### Footer

- **contact**: "Contact" section label
- **language**: "Language" section label
- **follow**: "Follow" section label
- **rights**: Copyright text (e.g., "All rights reserved.")
- **tagline**: Footer tagline

### Portfolio Page

- **title**: Page title
- **subtitle**: Page subtitle/description
- **filtersLabel**: ARIA label for filter buttons
- **allFilter**: "All" filter button
- **liveFilter**: "Live" filter button
- **djFilter**: "DJ" filter button
- **studioFilter**: "Studio" filter button
- **itemsCountLabel**: Label for item count

### Contact Page

- **title**: Page title
- **subtitle**: Page subtitle
- **form.name**: Name field label
- **form.email**: Email field label
- **form.message**: Message field label
- **form.submit**: Submit button text
- **form.sending**: Sending state text
- **form.success**: Success message
- **form.error**: Error message

### Booking Page

- **title**: Page title
- **subtitle**: Page subtitle
- **seoTitle**: SEO title
- **seoDescription**: SEO description
- **form.name**: Name field label
- **form.email**: Email field label
- **form.eventType**: Event type field label
- **form.eventDate**: Event date field label
- **form.location**: Location field label
- **form.locationPlaceholder**: Location placeholder text
- **form.message**: Message field label
- **form.submit**: Submit button text
- **form.sending**: Sending state text
- **form.success**: Success message
- **form.error**: Error message
- **eventTypes.live**: "Live" option
- **eventTypes.dj**: "DJ" option
- **eventTypes.corporate**: "Corporate" option
- **eventTypes.private**: "Private" option
- **eventTypes.other**: "Other" option

### About Page Labels

- **pageTitleFallback**: Fallback page title
- **introFallback**: Fallback intro text
- **bioTitle**: "Artist bio" heading
- **bioEmpty**: Empty state for bio
- **releasesTitle**: "Discography / releases" heading
- **releasesEmpty**: Empty state for releases
- **equipmentTitle**: "Equipment / setup" heading
- **equipmentEmpty**: Empty state for equipment
- **influencesTitle**: "Influences" heading
- **influencesEmpty**: Empty state for influences
- **photoAltFallback**: Fallback alt text for photo

### Services Page Labels

- **seoTitle**: SEO title
- **seoDescription**: SEO description
- **heading**: Page heading
- **subheading**: Page subheading
- **jsonLdName**: JSON-LD structured data name
- **emptyMessage**: "No services are published yet."
- **pricingLabel**: "Pricing" label
- **serviceFallbackTitle**: Fallback service title

### Press Page Labels

- **pageTitleFallback**: Fallback page title
- **intro**: Page intro text
- **bioTitle**: "Bio" heading
- **bioEmpty**: Empty state for bio
- **pressPhotosTitle**: "Press photos" heading
- **pressPhotosEmpty**: Empty state for press photos
- **pressMentionsTitle**: "Press mentions" heading
- **pressMentionsEmpty**: Empty state for press mentions
- **pressKitTitle**: "Press kit downloads" heading
- **pressKitEmpty**: Empty state for press kit
- **techRiderTitle**: "Tech rider" heading
- **techRiderEmpty**: Empty state for tech rider
- **stagePlotTitle**: "Stage plot" heading
- **stagePlotPlaceholder**: Placeholder text for stage plot
- **bookingsTitle**: "Bookings" heading
- **bookingsEmpty**: Empty state for bookings
- **downloadLabel**: "Download" button text

### Not Found Page (404)

- **title**: "Page not found" heading
- **body**: Description text
- **backHome**: "Back to home" button text

### Cookie Consent

- **dialogAriaLabel**: ARIA label for cookie dialog
- **title**: "Cookies & privacy" heading
- **description**: Cookie description text
- **acceptAll**: "Accept all" button
- **rejectNonEssential**: "Reject non-essential" button
- **customize**: "Preferences" button
- **dialogTitle**: "Cookie preferences" dialog title
- **dialogDescription**: Dialog description text
- **necessaryLabel**: "Essential (always on)" label
- **necessaryDescription**: Description of essential cookies
- **analyticsLabel**: "Analytics" label
- **analyticsDescription**: Description of analytics cookies
- **savePreferences**: "Save preferences" button
- **privacyPolicy**: "Privacy Policy" link
- **terms**: "Terms" link

## Important Notes

1. **All fields are localized** (EN/ES) - fill in both languages
2. **This is a singleton** - only create one siteLabels document
3. **Required for site to function** - the site will show empty strings if labels are missing
4. **Changes are immediate** after publishing

## Migration from i18next

If migrating from the old i18next JSON files, the translation keys map to these fields:

| Old i18next Key     | Site Labels Field       |
| ------------------- | ----------------------- |
| `brand`             | `brand`                 |
| `nav.home`          | `navigation.home`       |
| `nav.portfolio`     | `navigation.portfolio`  |
| `footer.contact`    | `footer.contact`        |
| `contact.form.name` | `contactPage.form.name` |
| etc.                | etc.                    |
