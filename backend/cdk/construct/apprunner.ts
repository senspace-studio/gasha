import * as ecr from 'aws-cdk-lib/aws-ecr'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as apprunner from 'aws-cdk-lib/aws-apprunner'
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager'
import { Construct } from 'constructs'

interface AppRunnerProps {
  vpc: ec2.Vpc
  repository: ecr.Repository
  appRunnerSecurityGroup: ec2.SecurityGroup
}

export class AppRunner extends Construct {
  constructor(scope: Construct, id: string, props: AppRunnerProps) {
    super(scope, id)

    const { vpc, repository, appRunnerSecurityGroup } = props

    const instanceRole = new iam.Role(scope, 'Gasha-AppRunner-Role', {
      roleName: 'Gasha-AppRunner-Role',
      assumedBy: new iam.ServicePrincipal('tasks.apprunner.amazonaws.com'),
    })

    const accessRole = new iam.Role(scope, 'Gasha-AppRunner-AccessRole', {
      roleName: 'Gasha-AppRunner-AccessRole',
      assumedBy: new iam.ServicePrincipal('build.apprunner.amazonaws.com'),
    })
    accessRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        'service-role/AWSAppRunnerServicePolicyForECRAccess'
      )
    )

    const secretsAppRunner = new secretsmanager.Secret(
      this,
      'Gasha-AppRunner-Secret',
      {
        description: 'for-Gasha-AppRunner',
        secretName: 'gasha-apprunner',
        generateSecretString: {
          includeSpace: false,
          excludePunctuation: true,
          passwordLength: 48,
          excludeCharacters: ' %+~`#$&*()|[]{}:;<>?!\'/@"\\',
          generateStringKey: 'api_key',
          secretStringTemplate: JSON.stringify({}),
        },
      }
    )

    const secretsDB = secretsmanager.Secret.fromSecretNameV2(
      scope,
      'gasha-db-secret',
      'gasha-db-secret'
    )

    const vpcConnector = new apprunner.CfnVpcConnector(
      scope,
      'Gasha-AppRunner-VpcConnector',
      {
        subnets: vpc.selectSubnets({
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        }).subnetIds,
        securityGroups: [appRunnerSecurityGroup.securityGroupId],
        vpcConnectorName: 'gasha-apprunner-vpc-connector',
      }
    )

    new apprunner.CfnService(scope, 'Gasha-AppRunner', {
      sourceConfiguration: {
        authenticationConfiguration: {
          accessRoleArn: accessRole.roleArn,
        },
        autoDeploymentsEnabled: true,
        imageRepository: {
          imageRepositoryType: 'ECR',
          imageIdentifier: repository.repositoryUriForTag('latest'),
          imageConfiguration: {
            port: '3000',
            runtimeEnvironmentVariables: [
              {
                name: 'DB_DOMAIN',
                value: secretsDB
                  .secretValueFromJson('host')
                  .unsafeUnwrap()
                  .toString(),
              },
              {
                name: 'DB_PORT',
                value: secretsDB
                  .secretValueFromJson('port')
                  .unsafeUnwrap()
                  .toString(),
              },
              {
                name: 'DB_USERNAME',
                value: secretsDB
                  .secretValueFromJson('username')
                  .unsafeUnwrap()
                  .toString(),
              },
              {
                name: 'DB_PASSWORD',
                value: secretsDB
                  .secretValueFromJson('password')
                  .unsafeUnwrap()
                  .toString(),
              },
              {
                name: 'DB_NAME',
                value: secretsDB
                  .secretValueFromJson('dbname')
                  .unsafeUnwrap()
                  .toString(),
              },
              {
                name: 'BLOCKCHAIN_API',
                value:
                  'https://base-sepolia.g.alchemy.com/v2/5kVob7zDOtjcG4NjjhECSAFH15_LVZsk',
              },
              {
                name: 'ERC1155_ADDRESS',
                value: '0xDD3b3b34FcB47d761B1aac2358E7703Aa8CD3b92',
              },
              {
                name: 'GASHA_ADDRESS',
                value: '0x1994176e3Ce8ff95ceE85a22D575728838619a17',
              },
            ],
          },
        },
      },
      healthCheckConfiguration: {
        path: '/health',
        interval: 60,
      },
      instanceConfiguration: {
        instanceRoleArn: instanceRole.roleArn,
        cpu: '512',
        memory: '1024',
      },
      networkConfiguration: {
        egressConfiguration: {
          egressType: 'VPC',
          vpcConnectorArn: vpcConnector.attrVpcConnectorArn,
        },
      },
      serviceName: 'gasha-apprunner',
    })
  }
}
