#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AmplifyStack } from '../lib/amplify-stack';

const app = new cdk.App();

const githubOwner = app.node.tryGetContext('githubOwner') ?? process.env.GITHUB_OWNER;
const githubRepo = app.node.tryGetContext('githubRepo') ?? process.env.GITHUB_REPO;
const githubTokenSecretName =
  app.node.tryGetContext('githubTokenSecretName') ??
  process.env.GITHUB_TOKEN_SECRET_NAME ??
  'github/token';

if (!githubOwner || !githubRepo) {
  throw new Error(
    'Missing GitHub repo configuration. Set context `githubOwner` and `githubRepo` (or env GITHUB_OWNER/GITHUB_REPO).'
  );
}

const customDomainName = app.node.tryGetContext('customDomainName') ?? process.env.CUSTOM_DOMAIN_NAME;
const customDomainMapWww =
  app.node.tryGetContext('customDomainMapWww') ??
  app.node.tryGetContext('customDomainEnableWww') ??
  false;
const customDomainMapApex = app.node.tryGetContext('customDomainMapApex') ?? true;
const customDomainSubdomainsRaw = app.node.tryGetContext('customDomainSubdomains') ?? '';
const customDomainSubdomains =
  typeof customDomainSubdomainsRaw === 'string' && customDomainSubdomainsRaw.trim().length > 0
    ? customDomainSubdomainsRaw.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

new AmplifyStack(app, 'AmplifyStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
  github: {
    owner: githubOwner,
    repo: githubRepo,
    oauthTokenSecretName: githubTokenSecretName
  },
  parameters: {
    nextPublicSanityProjectId:
      app.node.tryGetContext('NEXT_PUBLIC_SANITY_PROJECT_ID_PARAM') ??
      '/c2c-website/NEXT_PUBLIC_SANITY_PROJECT_ID',
    nextPublicSanityDataset:
      app.node.tryGetContext('NEXT_PUBLIC_SANITY_DATASET_PARAM') ??
      '/c2c-website/NEXT_PUBLIC_SANITY_DATASET',
    sanityApiToken:
      app.node.tryGetContext('SANITY_API_TOKEN_PARAM') ??
      '/c2c-website/SANITY_API_TOKEN',
    sanityWebhookSecret:
      app.node.tryGetContext('SANITY_WEBHOOK_SECRET_PARAM') ??
      '/c2c-website/SANITY_WEBHOOK_SECRET',
    resendApiKey:
      app.node.tryGetContext('RESEND_API_KEY_PARAM') ??
      '/c2c-website/RESEND_API_KEY',
    contactFormTo:
      app.node.tryGetContext('CONTACT_FORM_TO_PARAM') ?? '/c2c-website/CONTACT_FORM_TO',
    contactFormFrom:
      app.node.tryGetContext('CONTACT_FORM_FROM_PARAM') ?? '/c2c-website/CONTACT_FORM_FROM'
  },
  domain: customDomainName
    ? {
        name: customDomainName,
        mapApex: customDomainMapApex,
        mapWww: customDomainMapWww,
        subdomains: customDomainSubdomains
      }
    : undefined
});

