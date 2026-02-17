import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { AmplifyStack, AmplifyStackProps } from '../lib/amplify-stack';

function synthStack(overrides: Partial<AmplifyStackProps> = {}) {
  const app = new cdk.App();

  const stack = new AmplifyStack(app, 'TestAmplifyStack', {
    env: { account: '123456789012', region: 'us-east-1' },
    github: {
      owner: 'example',
      repo: 'repo',
      oauthTokenSecretName: 'github/token'
    },
    parameters: {
      nextPublicSanityProjectId: '/c2c-website/NEXT_PUBLIC_SANITY_PROJECT_ID',
      nextPublicSanityDataset: '/c2c-website/NEXT_PUBLIC_SANITY_DATASET',
      sanityApiToken: '/c2c-website/SANITY_API_TOKEN',
      sanityWebhookSecret: '/c2c-website/SANITY_WEBHOOK_SECRET',
      resendApiKey: '/c2c-website/RESEND_API_KEY',
      contactFormTo: '/c2c-website/CONTACT_FORM_TO',
      contactFormFrom: '/c2c-website/CONTACT_FORM_FROM'
    },
    ...overrides
  });

  return Template.fromStack(stack);
}

describe('AmplifyStack', () => {
  test('creates an Amplify app configured for Next.js SSR', () => {
    const template = synthStack();

    template.resourceCountIs('AWS::Amplify::App', 1);
    template.hasResourceProperties(
      'AWS::Amplify::App',
      Match.objectLike({
        Platform: 'WEB_COMPUTE',
        EnvironmentVariables: Match.arrayWith([
          Match.objectLike({ Name: 'NEXT_PUBLIC_SANITY_PROJECT_ID', Value: Match.anyValue() }),
          Match.objectLike({ Name: 'NEXT_PUBLIC_SANITY_DATASET', Value: Match.anyValue() }),
          Match.objectLike({ Name: 'SANITY_API_TOKEN', Value: Match.anyValue() }),
          Match.objectLike({ Name: 'SANITY_WEBHOOK_SECRET', Value: Match.anyValue() }),
          Match.objectLike({ Name: 'RESEND_API_KEY', Value: Match.anyValue() }),
          Match.objectLike({ Name: 'CONTACT_FORM_TO', Value: Match.anyValue() }),
          Match.objectLike({ Name: 'CONTACT_FORM_FROM', Value: Match.anyValue() })
        ]),
        BuildSpec: Match.stringLikeRegexp('nvm install 20')
      })
    );
  });

  test('creates a production main branch', () => {
    const template = synthStack();

    template.resourceCountIs('AWS::Amplify::Branch', 1);
    template.hasResourceProperties(
      'AWS::Amplify::Branch',
      Match.objectLike({
        BranchName: 'main',
        Stage: 'PRODUCTION'
      })
    );
  });

  test('matches the CloudFormation snapshot (no domain)', () => {
    const template = synthStack();
    expect(template.toJSON()).toMatchSnapshot();
  });

  test('creates a domain mapping when configured', () => {
    const template = synthStack({
      domain: { name: 'example.com', mapWww: true }
    });

    template.resourceCountIs('AWS::Amplify::Domain', 1);
    template.hasResourceProperties(
      'AWS::Amplify::Domain',
      Match.objectLike({
        DomainName: 'example.com'
      })
    );

    expect(template.toJSON()).toMatchSnapshot();
  });
});

