import * as ecr from 'aws-cdk-lib/aws-ecr'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as apprunner from 'aws-cdk-lib/aws-apprunner'
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager'
import { Construct } from 'constructs'
import { Config } from '../config'

interface AppRunnerProps {
  vpc: ec2.Vpc
  repository: ecr.Repository
  appRunnerSecurityGroup: ec2.SecurityGroup
  config: Config
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

    const secretsDB = secretsmanager.Secret.fromSecretNameV2(
      scope,
      `gasha-db-secret-${props.config.dbSecretSuffix}`,
      `gasha-db-secret-${props.config.dbSecretSuffix}`
    )

    const vpcConnector = new apprunner.CfnVpcConnector(
      scope,
      'Gasha-AppRunner-VpcConnector',
      {
        subnets: [
          ...vpc.selectSubnets({
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          }).subnetIds,
          ...vpc.selectSubnets({
            subnetType: ec2.SubnetType.PUBLIC,
          }).subnetIds,
        ],
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
                value: props.config.blockchainApi,
              },
              {
                name: 'ERC1155_ADDRESS',
                value: props.config.contractAddress.erc1155,
              },
              {
                name: 'GASHA_ADDRESS',
                value: props.config.contractAddress.gasha,
              },
            ],
          },
        },
      },
      healthCheckConfiguration: {
        path: '/',
        interval: 20,
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
