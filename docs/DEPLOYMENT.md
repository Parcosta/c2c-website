## Deployment (AWS Amplify Hosting + CDK)

This repo is a **Next.js 14 App Router** app deployed to **AWS Amplify Hosting (WEB_COMPUTE / SSR)**. The Amplify app and its environment variables are provisioned via the CDK stack in `infra/`.

### Prerequisites

- **AWS account** with permission to create: Amplify apps, CodeBuild resources (managed by Amplify), IAM roles, SSM Parameters, Secrets Manager secrets, and Route53/ACM if using a custom domain.
- **Node.js + npm** (repo uses `package-lock.json`).
- **AWS CLI** configured (`aws configure`) and **AWS CDK v2** available (the `infra/` package includes `aws-cdk` as a dev dependency).
- A **GitHub repo** for the app.

### 1) Create required parameters/secrets in AWS

The app expects these environment variables (see `.env.example`):

- **Public (browser-exposed)**:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` (SSM String)
  - `NEXT_PUBLIC_SANITY_DATASET` (SSM String)
- **Server-only (keep secret where appropriate)**:
  - `SANITY_API_TOKEN` (SSM SecureString)
  - `SANITY_WEBHOOK_SECRET` (SSM SecureString)
  - `RESEND_API_KEY` (SSM SecureString)
  - `CONTACT_FORM_TO` (SSM String)
  - `CONTACT_FORM_FROM` (SSM String)

By default, the CDK stack looks these up from SSM by name:

- `/c2c-website/NEXT_PUBLIC_SANITY_PROJECT_ID`
- `/c2c-website/NEXT_PUBLIC_SANITY_DATASET`
- `/c2c-website/SANITY_API_TOKEN`
- `/c2c-website/SANITY_WEBHOOK_SECRET`
- `/c2c-website/RESEND_API_KEY`
- `/c2c-website/CONTACT_FORM_TO`
- `/c2c-website/CONTACT_FORM_FROM`

Create them either in the AWS Console (SSM Parameter Store) or via the AWS CLI.

You also need a **GitHub OAuth token** stored in Secrets Manager. By default the stack reads it from the secret name `github/token` (override with CDK context `githubTokenSecretName`).

### 2) Deploy the CDK stack (`infra/`)

From the repo root:

```bash
cd infra
npm ci

# If your account/region isn't already bootstrapped for CDK:
npx cdk bootstrap

# Deploy (provide GitHub owner/repo via context or env)
npx cdk deploy -c githubOwner=<owner> -c githubRepo=<repo>
```

Useful overrides (CDK context):

- **GitHub**
  - `githubOwner`, `githubRepo`
  - `githubTokenSecretName` (default `github/token`)
- **SSM parameter names**
  - `NEXT_PUBLIC_SANITY_PROJECT_ID_PARAM`
  - `NEXT_PUBLIC_SANITY_DATASET_PARAM`
  - `SANITY_API_TOKEN_PARAM`
  - `SANITY_WEBHOOK_SECRET_PARAM`
  - `RESEND_API_KEY_PARAM`
  - `CONTACT_FORM_TO_PARAM`
  - `CONTACT_FORM_FROM_PARAM`
- **Custom domain**
  - `customDomainName`
  - `customDomainEnableWww` (default `false`)

After deployment, note the outputs:

- `AmplifyAppId`
- `AmplifyDefaultDomain`
- `AmplifySanityRebuildWebhookUrl`

### 3) Verify Amplify builds and SSR behavior

- The build spec is defined in two places:
  - `amplify.yml` in the repo (useful for Amplify Console-based setups)
  - `infra/lib/amplify-stack.ts` (the CDK stack’s source of truth)
- Builds run `npm ci` + `npm run build` and publish `.next/` artifacts.
- Node.js is pinned to **20** during builds (via `nvm`).

Environment variables set on the Amplify app are available:

- **During build**: for `next build` (used for bundling, static generation, and `NEXT_PUBLIC_*` inlining).
- **At runtime (SSR / Route Handlers)**: for `process.env.*` in Server Components and API routes (e.g. `/api/contact`, `/api/revalidate`).

### 4) Connect Sanity to on-demand revalidation (recommended)

This app exposes a signed webhook endpoint:

- `POST /api/revalidate`
  - Validates `x-sanity-signature` using `SANITY_WEBHOOK_SECRET`
  - Calls `revalidateTag("sanity")`

In Sanity, create a webhook that targets `/api/revalidate` on your production domain and includes the correct signature headers (Sanity-managed signing).

### 5) Optional: trigger full Amplify rebuilds from Sanity

The CDK stack also creates an Amplify webhook you can call to trigger a full rebuild:

- Use the CloudFormation output `AmplifySanityRebuildWebhookUrl`

This is helpful if you prefer “rebuild everything” semantics instead of tag-based revalidation.

### 6) Adding additional environment variables

Optional variables used by the app (examples):

- `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `NEXT_PUBLIC_NEXT_EVENT_NAME`, `NEXT_PUBLIC_NEXT_EVENT_START_DATE`, `NEXT_PUBLIC_NEXT_EVENT_URL`

You can add them as Amplify environment variables in the Amplify app settings, or wire them through CDK/SSM the same way as the required parameters above.

