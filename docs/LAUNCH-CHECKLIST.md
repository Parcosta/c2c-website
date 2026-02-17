# Launch Checklist

Use this checklist to validate **production readiness** before pointing the domain at the site. It’s written for this repo’s stack: **Next.js (App Router)** + **Sanity** + **Resend** + **AWS Amplify (via CDK)**.

---

## Release basics

- [ ] **Release date + rollback plan**: define a launch window, comms plan, and a clear rollback (what to revert, who does it, how long it takes).
- [ ] **Source of truth**: confirm `main` is the production branch in Amplify and the intended commit SHA is known.
- [ ] **CI/quality gates**: `npm run lint`, `npm test`, and `npm run e2e` are green on the release SHA.
- [ ] **Build sanity**: `npm run build` succeeds locally and in Amplify.

---

## Domain + DNS

- [ ] **Target domains**: decide canonical host (apex vs `www`) and list all domains/subdomains to support.
- [ ] **DNS records created**
  - [ ] Apex record (ALIAS/ANAME/A) points to Amplify/hosting target.
  - [ ] `www` record (CNAME) points to the canonical target (or to Amplify as configured).
  - [ ] Any additional records (e.g. `studio`, `assets`, `status`) are created as needed.
- [ ] **TTL strategy**: lower TTL ahead of cutover; raise it afterward if desired.
- [ ] **DNS propagation verified**: confirm resolution from multiple networks/regions.

---

## SSL/TLS (HTTPS)

- [ ] **Certificate issued**: HTTPS is active for all intended domains (apex/`www`).
- [ ] **No mixed content**: pages load without blocked HTTP assets.
- [ ] **HTTP → HTTPS redirect**: enforced at the edge/hosting layer.
- [ ] **Security headers** (baseline): confirm expected headers exist (at minimum: `Strict-Transport-Security` if enabled, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` as appropriate).

---

## Hosting (AWS Amplify)

- [ ] **Amplify environment**: production app/branch is set correctly (PRODUCTION).
- [ ] **Custom domain mapping**: domain is mapped to the correct Amplify branch and the canonical host is configured.
- [ ] **Caching behavior understood**: confirm CDN caching and invalidation behavior on deploy.
- [ ] **Server/edge runtime**: ensure any server-side routes/actions work in the target runtime (no reliance on local-only behavior).

---

## Environment variables + secrets

- [ ] **All required env vars set**: match `.env.example` and the README list.
- [ ] **Correct values for production**:
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` point to production dataset.
  - [ ] `SANITY_API_TOKEN` has the minimum permissions required and is **server-only**.
  - [ ] `RESEND_API_KEY` is present and scoped appropriately.
- [ ] **Secret storage**: secrets are stored in the intended system (Amplify env vars wired from SSM per `infra/`) and not committed.
- [ ] **Preview vs prod separation**: preview environments do not share production secrets unless explicitly intended.

---

## Sanity CMS + webhooks

- [ ] **Production dataset is ready**: required schemas/content exist, draft/publish workflow is understood, and content is reviewed.
- [ ] **CORS + origins**: Sanity project allows the production site origin(s).
- [ ] **Webhook(s) configured**
  - [ ] Webhook targets the correct production URL.
  - [ ] Webhook triggers on publish/update events that should revalidate/rebuild.
  - [ ] Webhook secret/signature (if used) matches server verification.
- [ ] **Revalidation verified**: publish a CMS change and confirm the site updates (ISR/revalidate/webhook flow works end-to-end).

---

## Analytics

- [ ] **Analytics tool chosen**: GA4 / Plausible / Segment / etc.
- [ ] **Production tracking configured**:
  - [ ] Correct measurement ID/site ID in production.
  - [ ] Events (pageview + key conversions) are firing.
  - [ ] Internal/test traffic filters are configured if needed.
- [ ] **Privacy/cookie requirements**: ensure consent banner and policy text exist if required for your jurisdiction/tooling.

---

## SEO + sharing

- [ ] **Indexing control**:
  - [ ] Production allows indexing (no accidental `noindex`).
  - [ ] Preview/staging environments are `noindex`.
- [ ] **Metadata**:
  - [ ] Title/description defaults are correct.
  - [ ] Open Graph and Twitter cards render correctly.
  - [ ] Social share image(s) exist and load over HTTPS.
- [ ] **Sitemap + robots**:
  - [ ] `robots.txt` is correct.
  - [ ] `sitemap.xml` exists (and includes the right canonical URLs).
- [ ] **Canonical URLs**: canonical host and trailing-slash policy are consistent.
- [ ] **Broken links**: scan key pages for 404s and incorrect internal links.

---

## Performance

- [ ] **Lighthouse pass** (representative pages): performance, accessibility, best practices, SEO are acceptable.
- [ ] **Core Web Vitals**: validate LCP/CLS/INP on mobile profiles.
- [ ] **Images optimized**: correct sizing, formats, and caching; no huge uncompressed assets.
- [ ] **Bundle sanity**: no unexpectedly large JS bundles; remove dead code where possible.
- [ ] **Caching verified**: static assets cached; dynamic content behaves as intended.

---

## Accessibility (a11y)

- [ ] **Keyboard navigation**: all interactive elements reachable and usable via keyboard.
- [ ] **Focus states**: visible focus indicators on dark theme.
- [ ] **Color contrast**: text and controls meet contrast guidelines.
- [ ] **Headings/landmarks**: semantic structure is correct; no skipped heading levels on key pages.
- [ ] **Forms a11y**: labels, error messages, and ARIA usage are correct.

---

## Forms + email (Resend)

- [ ] **Happy-path send**: production form submissions deliver email successfully.
- [ ] **Failure handling**: rate limits, invalid payloads, and provider errors show user-friendly messages.
- [ ] **Spam/abuse controls**: basic bot protection and throttling exist as appropriate.
- [ ] **Sender configuration**:
  - [ ] Verified sender/domain in Resend.
  - [ ] SPF/DKIM/DMARC configured for the sending domain (if applicable).
- [ ] **Operational visibility**: you can trace a submission from the app to Resend logs.

---

## Error handling + edge cases

- [ ] **404 page**: unknown routes render a friendly 404 and return proper status code.
- [ ] **500/exception behavior**: unexpected errors render a safe error UI and do not leak secrets.
- [ ] **Offline/slow network**: key pages behave reasonably on throttled mobile networks.
- [ ] **External dependencies**: Sanity/Resend outages degrade gracefully (as much as possible).

---

## Redirects + routing

- [ ] **Canonical host redirect**: apex ↔ `www` rules match your decision.
- [ ] **Legacy URL redirects**: old paths redirect with correct status codes (301/308 for permanent).
- [ ] **Trailing slash policy**: consistent across all routes.
- [ ] **Robustness**: verify query-string preservation where necessary (marketing links, UTMs).

---

## Monitoring + alerting

- [ ] **Uptime monitoring**: configured for the homepage and key journeys (e.g. contact form).
- [ ] **Error monitoring**: server/client error capture is in place (Sentry or equivalent), with alerts to the right channel.
- [ ] **Performance monitoring**: basic RUM or synthetic checks for core pages.
- [ ] **Operational runbook**: who gets paged, what’s the first action, where logs live.

---

## Backups + recovery

- [ ] **Sanity backup/export**: confirm backup/export strategy (scheduled export, dataset backups, or documented manual process).
- [ ] **Infrastructure recovery**: CDK stack can be re-deployed; critical parameters exist in SSM and are backed up appropriately.
- [ ] **Secrets recovery**: documented process to rotate/recover tokens/keys.

---

## Final pre-launch checks (day-of)

- [ ] **Content freeze** (optional): agree on final content changes and a cutoff time.
- [ ] **Cross-device smoke test**: mobile (iOS/Android), desktop (Chrome/Safari/Firefox) for key pages.
- [ ] **Real user flow**: complete the main CTA journey end-to-end (including form + email delivery).
- [ ] **Analytics live validation**: verify production traffic shows up correctly after DNS cutover.
- [ ] **Deploy one last time**: ensure the release SHA is deployed and stable before the domain cutover.
