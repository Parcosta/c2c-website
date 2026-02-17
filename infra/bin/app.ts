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
    resendApiKey:
      app.node.tryGetContext('RESEND_API_KEY_PARAM') ??
      '/c2c-website/RESEND_API_KEY'
  },
  domain: {
    name: app.node.tryGetContext('customDomainName') ?? undefined,
    enableWww: app.node.tryGetContext('customDomainEnableWww') ?? false
  }
});

