import * as cdk from 'aws-cdk-lib';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import { aws_codebuild as codebuild, custom_resources as cr, aws_ssm as ssm } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export type ParameterLookup = {
  nextPublicSanityProjectId: string;
  nextPublicSanityDataset: string;
  sanityApiToken: string;
  sanityWebhookSecret: string;
  resendApiKey: string;
};

export type GitHubSource = {
  owner: string;
  repo: string;
  oauthTokenSecretName: string;
};

export type DomainConfig = {
  name: string;
  mapApex?: boolean;
  mapWww?: boolean;
  subdomains?: string[];
};

export interface AmplifyStackProps extends cdk.StackProps {
  github: GitHubSource;
  parameters: ParameterLookup;
  domain?: DomainConfig;
}

function requiredParameter(scope: Construct, parameterName: string, secure: boolean): string {
  if (!parameterName || parameterName.trim().length === 0) {
    throw new Error('Parameter name must be a non-empty string.');
  }
  if (secure) {
    return cdk.SecretValue.ssmSecure(parameterName).toString();
  }
  return ssm.StringParameter.valueForStringParameter(scope, parameterName);
}

export class AmplifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AmplifyStackProps) {
    super(scope, id, props);

    const buildSpec = codebuild.BuildSpec.fromObjectToYaml({
      version: 1,
      frontend: {
        phases: {
          preBuild: {
            commands: ['npm ci']
          },
          build: {
            commands: ['npm run build']
          }
        },
        artifacts: {
          baseDirectory: '.next',
          files: ['**/*']
        },
        cache: {
          paths: ['node_modules/**/*', '.next/cache/**/*']
        }
      }
    });

    const app = new amplify.App(this, 'AmplifyApp', {
      platform: amplify.Platform.WEB_COMPUTE,
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: props.github.owner,
        repository: props.github.repo,
        oauthToken: cdk.SecretValue.secretsManager(props.github.oauthTokenSecretName)
      }),
      buildSpec,
      autoBranchDeletion: true,
      autoBranchCreation: {
        patterns: ['*']
      },
      environmentVariables: {
        NEXT_PUBLIC_SANITY_PROJECT_ID: requiredParameter(
          this,
          props.parameters.nextPublicSanityProjectId,
          false
        ),
        NEXT_PUBLIC_SANITY_DATASET: requiredParameter(
          this,
          props.parameters.nextPublicSanityDataset,
          false
        ),
        SANITY_API_TOKEN: requiredParameter(this, props.parameters.sanityApiToken, true),
        SANITY_WEBHOOK_SECRET: requiredParameter(this, props.parameters.sanityWebhookSecret, true),
        RESEND_API_KEY: requiredParameter(this, props.parameters.resendApiKey, true)
      }
    });

    const main = app.addBranch('main', {
      stage: 'PRODUCTION'
    });

    if (props.domain) {
      const { name, mapApex = true, mapWww = false, subdomains = [] } = props.domain;
      const domain = app.addDomain(name);

      if (mapApex) {
        domain.mapRoot(main);
      }

      if (mapWww) {
        domain.mapSubDomain(main, 'www');
      }

      for (const subdomain of subdomains) {
        if (subdomain && subdomain.trim().length > 0) {
          domain.mapSubDomain(main, subdomain.trim());
        }
      }
    }

    const sanityRebuildWebhook = new cr.AwsCustomResource(this, 'SanityRebuildWebhook', {
      onCreate: {
        service: 'Amplify',
        action: 'createWebhook',
        parameters: {
          appId: app.appId,
          branchName: 'main',
          description: 'Trigger Amplify rebuild from Sanity content changes'
        },
        physicalResourceId: cr.PhysicalResourceId.fromResponse('webhook.webhookId')
      },
      onUpdate: {
        service: 'Amplify',
        action: 'updateWebhook',
        parameters: {
          webhookId: new cr.PhysicalResourceIdReference(),
          branchName: 'main',
          description: 'Trigger Amplify rebuild from Sanity content changes'
        }
      },
      onDelete: {
        service: 'Amplify',
        action: 'deleteWebhook',
        parameters: {
          webhookId: new cr.PhysicalResourceIdReference()
        }
      },
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
        resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE
      })
    });

    new cdk.CfnOutput(this, 'AmplifyAppId', { value: app.appId });
    new cdk.CfnOutput(this, 'AmplifyDefaultDomain', { value: app.defaultDomain });
    new cdk.CfnOutput(this, 'AmplifySanityRebuildWebhookUrl', {
      value: sanityRebuildWebhook.getResponseField('webhook.webhookUrl')
    });
  }
}

