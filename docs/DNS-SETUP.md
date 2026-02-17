# DNS and Domain Setup (AWS Amplify)

This repo is hosted on **AWS Amplify (Next.js SSR / WEB_COMPUTE)**. Amplify can attach a custom domain, provision and renew SSL certificates automatically, and (optionally) redirect between `www` and the apex domain.

## Configure the custom domain in AWS Amplify

### Option A: Use the Amplify Console (recommended for first-time setup)

1. Open the Amplify app in the AWS Console.
2. Go to **App settings → Domain management → Add domain**.
3. Enter your domain (for example `example.com`) and choose your DNS provider:
   - **Amazon Route 53**: Amplify can create/verify records automatically if the hosted zone is in the same AWS account.
   - **Other**: Amplify will show the DNS records you must add manually at your DNS provider.
4. Map the domain to the `main` branch:
   - **Apex/root**: map `example.com` → `main`
   - **www** (optional): map `www.example.com` → `main`
5. Save. Amplify will start certificate provisioning. Keep the page open until it shows the DNS records (if you’re doing them manually).

### Option B: Configure via CDK (optional)

The CDK stack supports an optional domain association. In `infra/bin/app.ts`, the following context/env values are read:

- `customDomainName` (or `CUSTOM_DOMAIN_NAME`): `example.com`
- `customDomainMapApex` (default `true`): map the apex/root to `main`
- `customDomainMapWww` (or legacy `customDomainEnableWww`, default `false`): map `www` to `main`
- `customDomainSubdomains` (default empty): comma-separated prefixes, e.g. `shop,app`

Example deploy:

```bash
cd infra
npx cdk deploy \
  -c githubOwner=YOUR_ORG \
  -c githubRepo=YOUR_REPO \
  -c customDomainName=example.com \
  -c customDomainMapWww=true
```

## Required DNS records

Amplify shows the **exact** record names and targets for your app and domain. Always prefer the values shown in **Amplify → Domain management** because they’re unique per app/domain and may change based on region and configuration.

That said, the records usually fall into these categories:

### Subdomain (`www`, `app`, etc.): CNAME record

- **Type**: `CNAME`
- **Name/Host**: `www` (or `app`, etc.)
- **Value/Target**: the Amplify/CloudFront target shown by Amplify (often a `*.amplifyapp.com` or `*.cloudfront.net` hostname)

### Apex/root (`example.com`): ALIAS/ANAME or A record

DNS at the apex can’t use a standard CNAME in many providers, so use one of:

- **Route 53**: `A` and `AAAA` **Alias** records pointing to the CloudFront distribution target shown in Amplify.
- **Providers with ANAME/ALIAS/CNAME-flattening**: create an `ALIAS`/`ANAME` for `@` to the target shown in Amplify.
- **Providers without flattening**: you’ll typically need to move DNS to a provider that supports apex aliasing (Route 53 is the most common choice for Amplify).

### SSL certificate validation records (ACM)

Amplify provisions SSL certificates automatically and will show one or more **validation records** you must add (typically `CNAME` records with names like `_xxxx`).

- **Type**: `CNAME`
- **Name/Host**: a generated `_xxxx...` name (as shown in Amplify)
- **Value/Target**: a generated `...acm-validations.aws.` target (as shown in Amplify)

Do not remove these records after validation—Amplify/ACM may reuse them for renewal.

## SSL certificate auto-provisioning (what to expect)

- After the DNS records are in place, Amplify requests an ACM certificate and validates domain ownership via the CNAME validation records.
- Initial provisioning commonly takes **15–60 minutes**, but can take longer depending on DNS TTL and propagation.
- Renewals are automatic as long as the validation records remain in DNS.

## www ↔ non-www redirect (canonical host)

Pick a canonical hostname for marketing/SEO and enforce it consistently:

- **Canonical apex**: `https://example.com` (redirect `www` → apex)
- **Canonical www**: `https://www.example.com` (redirect apex → `www`)

### Redirect via Amplify (preferred when available)

In **Amplify → Domain management**, configure one hostname as the **primary** and set the other to **redirect** to it (Amplify supports this in the console even when both hostnames are mapped to the same branch).

If your Amplify UI doesn’t expose a redirect toggle, you can still:

- Keep both hostnames mapped to `main` so the site works on both, and
- Implement a host-based redirect at the app layer (for example, via Next.js Middleware).

## DNS propagation verification

### 1) Confirm DNS answers

Replace `example.com` with your domain.

```bash
# Apex/root
dig +short A example.com
dig +short AAAA example.com

# www (or other subdomain)
dig +short CNAME www.example.com

# Query public resolvers directly (helps spot partial propagation)
dig +short A example.com @1.1.1.1
dig +short A example.com @8.8.8.8
```

### 2) Confirm HTTPS and redirects

```bash
curl -I https://example.com
curl -I https://www.example.com
```

You’re looking for:

- `HTTP/2 200` (or `304`) for the canonical host
- `301/308` plus a `Location:` header for the non-canonical host (if redirect is configured)

### 3) Confirm the certificate covers the hostname

```bash
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null | openssl x509 -noout -subject -issuer -dates -ext subjectAltName
```

## Troubleshooting checklist

- **Wrong record type at apex**: switch to Route 53 Alias / ANAME / ALIAS (depending on provider).
- **CNAME points to the wrong target**: re-check the exact target shown in Amplify domain management.
- **Certificate stuck in “Pending verification”**: confirm the ACM validation CNAMEs exist exactly as shown (names must match precisely).
- **Only some networks resolve the new records**: wait for TTL; verify with `dig` against multiple resolvers.
