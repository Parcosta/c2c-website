# Backup Strategy (C2C Website)

This document describes how to back up and restore the core systems for the C2C website:

- **Content**: Sanity (documents + optionally assets)
- **Code**: Git repository
- **Configuration/secrets**: environment variables (AWS SSM / Secrets), AWS Amplify configuration (via CDK)

The guiding principles are:

- **Automate** backups where possible.
- Keep backups **offsite**, **encrypted**, and **access-controlled**.
- Practice restores with a lightweight **disaster recovery drill**.

## What to back up

### Sanity (source-of-truth content)

- **Dataset export**: a `.tar.gz` export of the Sanity dataset.
- **Assets**: included by default in Sanity dataset exports (recommended for at least weekly backups).
- **Token**: the export/import process requires a token with appropriate permissions (store it securely; never commit it).

This repo includes a helper script: `scripts/backup-sanity.sh`.

### Git repository (source-of-truth code + infra)

- GitHub is the primary remote, but you should still keep an **independent mirror** (or periodic bundles) in case of account/org issues.
- Back up:
  - `main` and active release branches
  - tags
  - repository settings are optional, but useful for full recovery (branch protections, Actions secrets, etc.)

### Environment variables / secrets

This project uses:

- Local development: `.env.local` (based on `.env.example`)
- Production (Amplify via CDK): values come from **AWS SSM Parameter Store** (String + SecureString) and are injected into the Amplify app as env vars.

Back up:

- The **SSM parameter names** used by the CDK stack
- The **parameter values** (securely, encrypted at rest)
- The **GitHub OAuth token secret** referenced by the Amplify CDK stack (Secrets Manager secret name + value)

### AWS Amplify configuration

Amplify configuration is intended to be reproducible from code:

- `amplify.yml` (build spec)
- `infra/` (AWS CDK stack that provisions Amplify, branch config, env wiring, and optional domain mapping)

Back up:

- `infra/` source (already in Git)
- CDK context inputs you rely on (GitHub owner/repo, parameter names, custom domain config)
- Any console-only settings you might have added (ideally, migrate them into CDK)

## Sanity dataset export/import

### Export (backup)

Prerequisites:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` set in your environment
- `SANITY_API_TOKEN` set (server-only token) with permissions to export/import datasets

Run:

```bash
./scripts/backup-sanity.sh
```

Notes:

- By default, the Sanity export includes **assets**. To export documents only:

```bash
./scripts/backup-sanity.sh --no-assets
```

- Exports are written to `backups/sanity/` by default. Treat this directory as **local-only**; sync the resulting `.tar.gz` to your encrypted backup storage.

### Import (restore)

Importing overwrites/merges depending on flags; do this carefully (ideally into a new dataset first).

Typical approach:

1. Create a new dataset (example: `recovery-YYYYMMDD`) or decide to restore into `production`.
2. Import the `.tar.gz` backup using the Sanity CLI:

```bash
export NEXT_PUBLIC_SANITY_PROJECT_ID="..."
export NEXT_PUBLIC_SANITY_DATASET="recovery-20260217"
export SANITY_API_TOKEN="..."

export SANITY_AUTH_TOKEN="$SANITY_API_TOKEN"
npx sanity dataset import "backups/sanity/<your-export>.tar.gz" "$NEXT_PUBLIC_SANITY_DATASET" --replace
```

If you must restore into `production`, validate thoroughly before pointing the frontend at it.

## Git repository backup

Recommended options:

- **Mirror clone** to a second provider/org:

```bash
git clone --mirror git@github.com:<org>/<repo>.git
cd <repo>.git
git remote add backup git@<other-provider>:<org>/<repo>.git
git push --mirror backup
```

- **Git bundle** (single-file offline backup):

```bash
git bundle create "backups/git/c2c-website-$(date -u +%Y%m%dT%H%M%SZ).bundle" --all
```

Store bundles/mirrors in encrypted storage with retention.

## Environment variables backup (SSM / Secrets)

In production, values are sourced from SSM parameters (see `infra/lib/amplify-stack.ts` and README deployment docs).

Recommended backup approach:

- Export the **current values** of the SSM parameters and store them encrypted.
- Export the **name/value** of the GitHub OAuth token secret used by the Amplify stack (Secrets Manager).
- Keep a record of:
  - AWS account + region
  - Parameter names (paths)
  - KMS key(s) used for SecureString encryption

Example (SSM):

```bash
aws ssm get-parameters \
  --names "/c2c-website/NEXT_PUBLIC_SANITY_PROJECT_ID" "/c2c-website/NEXT_PUBLIC_SANITY_DATASET" \
  --with-decryption
```

Never commit exported secrets into Git.

## AWS Amplify configuration backup

Because Amplify is provisioned via CDK:

- The primary “backup” is the **infra code** in `infra/` plus your AWS account configuration.
- Ensure you can reproduce:
  - Amplify app + branch settings
  - Environment variable wiring (SSM + SecureString)
  - Domain mappings (if used)

Recommended:

- Capture CDK context values you use in deploy scripts/CI (GitHub owner/repo, domain name, parameter paths).
- Periodically export the synthesized CloudFormation templates for record-keeping:

```bash
cd infra
npm ci
npx cdk synth > "../backups/infra/cdk-synth-$(date -u +%Y%m%dT%H%M%SZ).yaml"
```

## Disaster recovery runbook (high level)

The fastest recovery path is to rebuild infrastructure from code and restore content/secrets from backups.

1. **Identify blast radius**
   - Sanity only? GitHub only? AWS account or Amplify only?
2. **Restore Git**
   - Recover repo from GitHub or mirror/bundle backup.
3. **Restore secrets/config**
   - Recreate required SSM parameters (and SecureString values) and the GitHub token secret in Secrets Manager.
4. **Reprovision Amplify**
   - Deploy CDK stack in `infra/` to recreate Amplify and env wiring.
5. **Restore Sanity content**
   - Import most recent `.tar.gz` backup into a recovery dataset first.
   - Validate in preview/staging, then cut over (or import into `production` if necessary).
6. **Validate end-to-end**
   - Smoke test website routes
   - Verify Sanity-driven pages render as expected
   - Verify email sending if applicable (Resend)
7. **Postmortem + hardening**
   - Ensure backups are current, retention is correct, and access is restricted.

## Backup schedule recommendations

Adjust based on how often content changes and your tolerance for data loss.

- **Sanity**
  - **Daily**: dataset export (documents + assets) OR use `--no-assets` for quicker daily backups if assets rarely change
  - **Weekly**: full export (including assets)
  - **Retention**: 30 daily + 12 weekly + 12 monthly
- **Git**
  - **Nightly**: mirror push or bundle
  - **Before releases**: tag + bundle
  - **Retention**: at least 90 days; keep monthly bundles longer-term
- **SSM/Secrets**
  - **After any change** to secret values
  - **Monthly**: verify and archive current values (encrypted)
- **Infra/Amplify**
  - **After any infra change**: store `cdk synth` output and keep the deploy logs/artifacts

## Verification (restore drills)

At least quarterly:

- Restore Sanity export into a new dataset and validate the site against it.
- Restore secrets into a non-prod AWS account/stack (or a sandbox stack) and ensure CDK can recreate Amplify.
- Restore Git from a bundle and confirm builds/tests pass.
