# PRD: Coast2Coast (C2C) Website Content Migration
## Google Docs → Sanity CMS Integration

**Document Version:** 1.0  
**Date:** March 9, 2026  
**Author:** OpenClaw Agent  
**Status:** Draft - Pending Review  
**Ticket:** TBD (Linear)

---

## 1. Executive Summary

### 1.1 Purpose
This PRD documents the complete effort to migrate real content from Google Docs into the Coast2Coast (C2C) artist website's Sanity CMS, replacing all placeholder content currently in place.

### 1.2 Background
The C2C website has been architected with a solid technical foundation:
- Next.js 14 (App Router) with TypeScript
- Tailwind CSS + shadcn/ui component system
- Sanity CMS with bilingual support (EN/ES)
- i18next-react for internationalization
- AWS Amplify hosting

However, all content areas currently contain placeholder text and images. The artist (Sofía) has prepared real content in Google Docs that needs to be extracted, parsed, and integrated into the CMS.

### 1.3 Goals
1. Extract all content from provided Google Docs folder
2. Parse and structure content according to Sanity schema
3. Upload images to Sanity's asset store
4. Populate all CMS documents with real content
5. Verify content renders correctly on all pages
6. Ensure bilingual content parity (EN/ES)

### 1.4 Success Criteria
- [ ] All placeholder content replaced with real artist content
- [ ] Images display correctly with proper hotspots/cropping
- [ ] Both EN and ES versions fully populated
- [ ] All pages render without errors
- [ ] Content passes visual QA
- [ ] Site maintains performance benchmarks

---

## 2. Technical Architecture

### 2.1 Current Sanity Schema Overview

| Document Type | Purpose | Fields |
|--------------|---------|--------|
| `siteSettings` | Global site config | siteName (localized), logo, socialLinks, contactEmail |
| `aboutPage` | Artist bio page | title, intro, photo, bio (block content), releases, equipment, influences |
| `portfolioItem` | Creative work gallery | title, slug, category, images, featuredMedia, description, date, tags |
| `event` | Shows/gigs | title, date, venue, city, country, ticketUrl, flyer |
| `service` | Offered services | title, description, pricing, icon, features |
| `pressItem` | Press mentions | title, publication, date, url, quote, image |
| `pressPage` | EPK page | title, bio, pressPhotos, pressKitAssets, techRider, stagePlot, contact |
| `page` | Generic pages | title, slug, content blocks |

### 2.2 Localization Strategy
All content fields use localized types:
- `localeString` - Short text (titles, labels)
- `localeText` - Longer plain text (intros, descriptions)
- `localeBlockContent` - Rich text with formatting
- `localeSlug` - URL-friendly identifiers

### 2.3 Image Handling
- Sanity's image pipeline with hotspot support
- WebP/AVIF automatic conversion
- Responsive srcset generation
- Focal point editing in Studio

### 2.4 Content Flow Diagram
```
Google Docs Folder
    ↓
[Content Extraction]
    ↓
Text Parsing → Structured Data
Image Download → Sanity Asset Store
    ↓
[Content Mapping]
    ↓
Sanity Documents (EN + ES)
    ↓
[Validation & Testing]
    ↓
Live Site (Amplify)
```

---

## 3. Content Mapping

### 3.1 Site Settings (`siteSettings`)
**Single document, singleton pattern**

| Content Source | Sanity Field | Type | Notes |
|---------------|--------------|------|-------|
| Artist/brand name | `siteName` | localeString | EN: "Coast2Coast", ES: "Coast2Coast" |
| Logo file | `logo` | image | Upload to Sanity, set hotspot |
| Social media links | `socialLinks` | array | Instagram, SoundCloud, Spotify, etc. |
| Contact email | `contactEmail` | string | Bookings/management email |

### 3.2 About Page (`aboutPage`)
**Single document, singleton pattern**

| Content Source | Sanity Field | Type | Notes |
|---------------|--------------|------|-------|
| Page title | `title` | localeString | "About / Acerca de" |
| Intro paragraph | `intro` | localeText | Short artist intro |
| Artist photo | `photo` | image | Professional headshot/press photo |
| Photo alt text | `photoAlt` | localeString | Accessibility description |
| Full biography | `bio` | localeBlockContent | Rich text with formatting |
| Discography | `releases` | array | Album/EP/track listings |
| Equipment list | `equipmentGroups` | array | Modular setup, gear categories |
| Musical influences | `influences` | array | Artists, genres, movements |

### 3.3 Portfolio Items (`portfolioItem`)
**Multiple documents, one per project**

| Content Source | Sanity Field | Type | Notes |
|---------------|--------------|------|-------|
| Project title | `title` | localeString | Installation/performance name |
| URL slug | `slug` | localeSlug | Auto-generated from title |
| Category | `category` | localeString | Type of work (e.g., "Live PA", "Installation") |
| Project images | `images` | array | Gallery photos |
| Hero media | `featuredMedia` | image/file | Video or featured image |
| Description | `description` | localeBlockContent | Project details |
| Date | `date` | datetime | When project occurred |
| Tags | `tags` | array | Search/filter keywords |

### 3.4 Events (`event`)
**Multiple documents, one per show**

| Content Source | Sanity Field | Type | Notes |
|---------------|--------------|------|-------|
| Event title | `title` | localeString | Show/festival name |
| Date/time | `date` | datetime | Performance date |
| Venue name | `venue` | localeString | Club, festival, space |
| City | `city` | localeString | Location city |
| Country | `country` | localeString | Location country |
| Ticket link | `ticketUrl` | url | Eventbrite, RA, etc. |
| Event flyer | `flyer` | image | Promotional artwork |

### 3.5 Services (`service`)
**Multiple documents, one per offering**

| Content Source | Sanity Field | Type | Notes |
|---------------|--------------|------|-------|
| Service name | `title` | localeString | e.g., "Live PA Booking" |
| Description | `description` | localeText | What's included |
| Pricing | `pricing` | localeString | "From $X" or "Custom quote" |
| Icon | `icon` | string | Lucide icon name |
| Features | `features` | array | Bullet points of what's included |

### 3.6 Press Items (`pressItem`)
**Multiple documents, one per mention**

| Content Source | Sanity Field | Type | Notes |
|---------------|--------------|------|-------|
| Article title | `title` | localeString | Headline of press piece |
| Publication | `publication` | localeString | Magazine, blog, site name |
| Date published | `date` | datetime | When article appeared |
| Article URL | `url` | url | Link to full piece |
| Pull quote | `quote` | localeText | Highlighted excerpt |
| Associated image | `image` | image | Screenshot or artwork |

### 3.7 Press/EPK Page (`pressPage`)
**Single document, singleton pattern**

| Content Source | Sanity Field | Type | Notes |
|---------------|--------------|------|-------|
| Page title | `title` | localeString | "Press / Prensa" |
| Short bio | `bio` | localeBlockContent | For media use |
| Press photos | `pressPhotos` | array | High-res downloads |
| Downloadable assets | `pressKitAssets` | array | One-sheets, logos, etc. |
| Tech rider PDF | `techRider` | file | Stage requirements |
| Stage plot PDF | `stagePlot` | file | Setup diagram |
| Bookings email | `bookingsEmail` | string | For press inquiries |
| Bookings phone | `bookingsPhone` | string | Optional contact number |

---

## 4. Implementation Plan

### 4.1 Phase 1: Discovery & Setup (Day 1)

#### 4.1.1 Google Docs Access
- [ ] Receive shared Google Docs folder link from Zac
- [ ] Verify read access to all documents
- [ ] Inventory all files (docs, sheets, images, PDFs)
- [ ] Document file structure and naming conventions

#### 4.1.2 Sanity Environment Verification
- [ ] Confirm Sanity project ID and dataset
- [ ] Verify API token has write permissions
- [ ] Test connection to Sanity Studio
- [ ] Document current CMS state (what's already there)

#### 4.1.3 Content Audit
- [ ] Map each Google Doc to Sanity document type
- [ ] Identify bilingual content pairs (EN/ES)
- [ ] Flag missing translations
- [ ] Note image assets and their locations

### 4.2 Phase 2: Content Extraction (Day 1-2)

#### 4.2.1 Text Content Extraction
**Approach:** Use Google Docs API or export functionality

```typescript
// Pseudo-code for extraction
interface ExtractedContent {
  documentId: string;
  documentName: string;
  contentType: 'about' | 'portfolio' | 'event' | 'service' | 'press';
  language: 'en' | 'es';
  textContent: string;
  structuredData: Record<string, any>;
  imageReferences: string[];
}
```

**Tools:**
- Google Drive API for programmatic access
- OR manual export to Markdown/JSON if API access limited
- Image download via direct URLs or export

#### 4.2.2 Image Asset Processing
- [ ] Download all images from Google Docs
- [ ] Organize by content type (about, portfolio, press, etc.)
- [ ] Verify image formats (prefer WebP, fallback JPG/PNG)
- [ ] Note any images needing hotspot/focal point editing

### 4.3 Phase 3: Content Transformation (Day 2-3)

#### 4.3.1 Text Processing Pipeline

**Step 1: Parse Google Docs Content**
- Extract plain text and formatting
- Preserve headings, lists, links
- Identify bilingual sections

**Step 2: Map to Sanity Structure**
- Transform flat text to nested objects
- Split combined docs into separate documents
- Generate slugs from titles

**Step 3: Localization Handling**
- Pair EN/ES content
- Flag missing translations for review
- Ensure consistent structure across languages

#### 4.3.2 Image Upload to Sanity

```typescript
// Upload workflow
for (const image of extractedImages) {
  // 1. Read image file
  const buffer = await fs.readFile(image.path);
  
  // 2. Upload to Sanity asset store
  const asset = await sanityClient.assets.upload('image', buffer, {
    filename: image.filename,
    contentType: image.mimeType,
  });
  
  // 3. Store asset reference for document creation
  imageAssets[image.id] = {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id }
  };
}
```

### 4.4 Phase 4: CMS Population (Day 3-4)

#### 4.4.1 Document Creation Order
1. **Site Settings** - Global config first
2. **About Page** - Core artist identity
3. **Services** - Offerings (smaller, self-contained)
4. **Portfolio Items** - Creative work (may have many)
5. **Events** - Shows/gigs (time-sensitive)
6. **Press Items** - Media mentions
7. **Press Page** - EPK materials

#### 4.4.2 Bilingual Content Strategy

**Option A: Parallel Documents**
- Create EN and ES versions simultaneously
- Ensure 1:1 field parity
- Flag missing translations

**Option B: Single Pass with Translation Gaps**
- Create documents with available language
- Mark missing language fields
- Generate report for manual completion

**Recommended:** Option A with automated translation gap detection

### 4.5 Phase 5: Verification & QA (Day 4-5)

#### 4.5.1 Automated Validation
- [ ] All required fields populated
- [ ] Image references resolve correctly
- [ ] Slugs are unique and URL-safe
- [ ] Dates are valid ISO 8601
- [ ] URLs are well-formed

#### 4.5.2 Visual QA Checklist

**Homepage:**
- [ ] Hero section displays correctly
- [ ] Navigation shows real site name
- [ ] Featured content appears

**About Page:**
- [ ] Artist photo displays with proper aspect ratio
- [ ] Bio text renders with correct formatting
- [ ] Discography list is complete
- [ ] Equipment sections render

**Portfolio:**
- [ ] Gallery grid displays
- [ ] Images load and lazy-load correctly
- [ ] Click-through to detail pages works
- [ ] Categories filter correctly

**Events:**
- [ ] Event list sorted by date
- [ ] Past events handled appropriately
- [ ] Ticket links work
- [ ] Flyers display

**Press/EPK:**
- [ ] Press photos downloadable
- [ ] PDF assets accessible
- [ ] Contact information correct

**Language Switching:**
- [ ] EN/ES toggle works on all pages
- [ ] Content switches correctly
- [ ] URLs update with locale prefix

#### 4.5.3 Performance Checks
- [ ] Lighthouse score > 90
- [ ] Image loading times acceptable
- [ ] No layout shift from image loading
- [ ] CMS queries return < 200ms

---

## 5. Technical Implementation Details

### 5.1 Required Environment Variables

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxx  # With write permissions
SANITY_WEBHOOK_SECRET=xxx

# Google (if using API)
GOOGLE_SERVICE_ACCOUNT_KEY=xxx  # For Docs API access
GOOGLE_FOLDER_ID=xxx  # Target folder ID
```

### 5.2 Scripts & Tools

#### 5.2.1 Content Extraction Script
```typescript
// scripts/extract-content.ts
import { google } from 'googleapis';

async function extractFromGoogleDocs(folderId: string) {
  const drive = google.drive({ version: 'v3', auth });
  const docs = google.docs({ version: 'v1', auth });
  
  // List all files in folder
  const files = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    fields: 'files(id, name, mimeType)',
  });
  
  // Process each document
  for (const file of files.data.files || []) {
    if (file.mimeType === 'application/vnd.google-apps.document') {
      const content = await docs.documents.get({ documentId: file.id! });
      // Parse content structure...
    }
  }
}
```

#### 5.2.2 Sanity Upload Script
```typescript
// scripts/upload-to-sanity.ts
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-03-01',
  useCdn: false,
});

async function uploadContent(content: ExtractedContent[]) {
  const transaction = sanityClient.transaction();
  
  for (const item of content) {
    const doc = transformToSanityDocument(item);
    transaction.createOrReplace(doc);
  }
  
  await transaction.commit();
}
```

### 5.3 Error Handling

| Error Type | Handling Strategy |
|-----------|-------------------|
| Google API rate limit | Exponential backoff, batch requests |
| Image upload failure | Retry 3x, log failed assets, continue |
| Missing required field | Skip document, add to error report |
| Invalid slug | Auto-sanitize, log original |
| Duplicate document | Update instead of create, log conflict |
| Network timeout | Retry with backoff, fail after 3 attempts |

### 5.4 Rollback Strategy

**Before any writes:**
1. Export current Sanity dataset as backup
2. Tag all new documents with `source: 'google-docs-migration'`
3. Store migration timestamp

**If rollback needed:**
```bash
# Delete all migration documents
sanity documents query '*[_type in [...] && source == "google-docs-migration"]' | \
  sanity documents delete

# Or restore from backup
sanity dataset import backup.tar.gz production
```

---

## 6. Testing Strategy

### 6.1 Unit Tests
- Content transformation functions
- Slug generation
- Image URL extraction
- Localization pairing

### 6.2 Integration Tests
- Google API connectivity
- Sanity write operations
- Image upload pipeline
- End-to-end content flow

### 6.3 Visual Regression Tests
- Screenshots of all pages before/after
- Compare using pixelmatch or similar
- Flag significant differences for review

### 6.4 Manual QA Checklist
See Phase 5.5.2 above

---

## 7. Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Google Docs API access denied | Medium | High | Have manual export fallback ready |
| Images lack proper licensing | Low | High | Verify with Zac before using |
| Content structure doesn't match schema | Medium | Medium | Flexible transformation pipeline |
| Missing ES translations | High | Medium | Flag gaps, use EN as fallback |
| Sanity write quota exceeded | Low | Medium | Batch operations, rate limiting |
| Image upload size limits | Medium | Low | Compress/resize before upload |
| Content updates during migration | Low | High | Coordinate timing with Zac |

---

## 8. Deliverables

### 8.1 Code Deliverables
- [ ] Content extraction scripts
- [ ] Transformation utilities
- [ ] Sanity upload scripts
- [ ] Validation/QA scripts
- [ ] Rollback procedures

### 8.2 Documentation Deliverables
- [ ] Content mapping spreadsheet (auto-generated)
- [ ] Migration execution log
- [ ] Error/warning report
- [ ] Post-migration QA report

### 8.3 CMS Deliverables
- [ ] Fully populated Sanity dataset
- [ ] All images in asset store
- [ ] Properly configured hotspots on images
- [ ] Working preview deployments

---

## 9. Timeline

| Phase | Duration | Owner | Dependencies |
|-------|----------|-------|--------------|
| 1. Discovery & Setup | 0.5 days | OpenClaw | Google Docs access |
| 2. Content Extraction | 1 day | OpenClaw | Phase 1 complete |
| 3. Content Transformation | 1.5 days | OpenClaw | Phase 2 complete |
| 4. CMS Population | 1.5 days | OpenClaw | Phase 3 complete |
| 5. Verification & QA | 1 day | OpenClaw + Zac | Phase 4 complete |
| **Total** | **5.5 days** | | |

---

## 10. Open Questions

1. **Google Docs Access:** What is the preferred method for accessing the content?
   - Option A: Share folder link, I extract via API
   - Option B: Zac exports to structured format (Markdown/JSON)
   - Option C: Hybrid approach

2. **Image Assets:** Where are high-res images stored?
   - In the same Google Drive folder?
   - Separate cloud storage (Dropbox, etc.)?
   - Need to request specific files?

3. **Translation Completeness:** Is all content fully bilingual?
   - If ES content is missing, should I:
     - Leave fields empty?
     - Auto-translate (not recommended)?
     - Use EN as placeholder?

4. **Content Updates:** Is the Google Docs content final?
   - Should I expect changes during migration?
   - Lock documents during migration?

5. **Image Hotspots:** Should I set focal points on images?
   - Use center as default?
   - Manual review needed?

6. **SEO Metadata:** Is there specific SEO content to include?
   - Meta descriptions per page?
   - Specific keywords?
   - Social share images?

---

## 11. Appendix

### 11.1 Sanity GROQ Queries for Validation

```javascript
// Check all documents by type
*[_type == "aboutPage"] { title, _updatedAt }

// Check for missing translations
*[_type == "portfolioItem" && !defined(title.es)] { title, _id }

// Check image references
*[_type == "aboutPage"] { 
  "hasPhoto": defined(photo.asset),
  "photoUrl": photo.asset->url
}

// Count documents by type
*[_type in ["portfolioItem", "event", "service", "pressItem"]] 
  | order(_type asc) 
  | { _type, count: count(*) }
```

### 11.2 Useful Commands

```bash
# Export Sanity dataset (backup)
sanity dataset export production backup-$(date +%Y%m%d).tar.gz

# Import test data
sanity dataset import test-data.tar.gz production

# List all assets
sanity assets list

# Delete all documents of a type (DANGER)
sanity documents query '*[_type == "portfolioItem"]' | sanity documents delete
```

### 11.3 Related Documentation
- [Sanity Schema Docs](https://www.sanity.io/docs/schema-types)
- [Next.js i18n Routing](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Google Drive API](https://developers.google.com/drive/api/guides/about-sdk)

---

## 12. Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | Zac | | |
| Technical Lead | OpenClaw | | |
| QA Reviewer | | | |

---

*This PRD is a living document. Updates will be tracked in version history.*
