import * as ecr from "aws-cdk-lib/aws-ecr"
import * as ec2 from "aws-cdk-lib/aws-ec2"
import * as iam from "aws-cdk-lib/aws-iam"
import * as apprunner from "aws-cdk-lib/aws-apprunner"
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager"
import { Construct } from "constructs"
import { Config } from "../config"

interface AppRunnerProps {
  vpc: ec2.Vpc
  appRunnerSecurityGroup: ec2.SecurityGroup
  config: Config
}

export class AppRunner extends Construct {
  constructor(scope: Construct, id: string, props: AppRunnerProps) {
    super(scope, id)

    const { vpc, appRunnerSecurityGroup } = props

    const instanceRole = new iam.Role(scope, `${id}-AppRunner-Role`, {
      roleName: `${id}-AppRunner-Role`,
      assumedBy: new iam.ServicePrincipal("tasks.apprunner.amazonaws.com"),
    })

    const accessRole = new iam.Role(scope, `${id}-AppRunner-AccessRole`, {
      roleName: `${id}-AppRunner-AccessRole`,
      assumedBy: new iam.ServicePrincipal("build.apprunner.amazonaws.com"),
    })
    accessRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSAppRunnerServicePolicyForECRAccess"
      )
    )

    const secretsDB = secretsmanager.Secret.fromSecretNameV2(
      scope,
      `${id
        .replace("AppRunner", "Rds")
        .replace("AppStack", "RdsStack")}-db-secret-${
        props.config.dbSecretSuffix
      }`,
      `${id
        .replace("AppRunner", "Rds")
        .replace("AppStack", "RdsStack")}-db-secret-${
        props.config.dbSecretSuffix
      }`
    )

    const vpcConnector = new apprunner.CfnVpcConnector(
      scope,
      `${id}-AppRunner-VpcConnector`,
      {
        subnets: vpc.selectSubnets({
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        }).subnetIds,
        securityGroups: [appRunnerSecurityGroup.securityGroupId],
        vpcConnectorName: `${id.toLocaleLowerCase()}-vpc-con`,
      }
    )

    new apprunner.CfnService(scope, `${id}-AppRunner`, {
      sourceConfiguration: {
        authenticationConfiguration: {
          accessRoleArn: accessRole.roleArn,
        },
        autoDeploymentsEnabled: true,
        imageRepository: {
          imageRepositoryType: "ECR",
          imageIdentifier: `${props.config.aws.accountId}.dkr.ecr.${
            props.config.aws.region
          }.amazonaws.com/${id.toLowerCase()}:latest`,
          imageConfiguration: {
            port: "3000",
            runtimeEnvironmentVariables: [
              {
                name: "DB_DOMAIN",
                value: secretsDB
                  .secretValueFromJson("host")
                  .unsafeUnwrap()
                  .toString(),
              },
              {
                name: "DB_PORT",
                value: secretsDB
                  .secretValueFromJson("port")
                  .unsafeUnwrap()
                  .toString(),
              },
              {
                name: "DB_USERNAME",
                value: secretsDB
                  .secretValueFromJson("username")
                  .unsafeUnwrap()
                  .toString(),
              },
              {
                name: "DB_PASSWORD",
                value: secretsDB
                  .secretValueFromJson("password")
                  .unsafeUnwrap()
                  .toString(),
              },
              {
                name: "DB_NAME",
                value: secretsDB
                  .secretValueFromJson("dbname")
                  .unsafeUnwrap()
                  .toString(),
              },
              {
                name: "BLOCKCHAIN_API",
                value: props.config.blockchainApi,
              },
              {
                name: "ERC1155_ADDRESS",
                value: props.config.contractAddress.erc1155,
              },
              {
                name: "GASHA_ADDRESS",
                value: props.config.contractAddress.gasha,
              },
              {
                name: "NEYNAR_API_KEY",
                value: props.config.neynarApiKey,
              },
              {
                name: "CLIENT_URL",
                value: props.config.clientURL,
              },
              {
                name: "CHAIN_ID",
                value: props.config.chainId,
              },
              {
                name: "ADMIN_PRIVATE_KEY",
                value: props.config.adminPrivateKey,
              },
              {
                name: "UPDATE_SCORE_INTERVAL_MINUTES",
                value: props.config.updateScoreIntervalMinutes,
              },
            ],
          },
        },
      },
      healthCheckConfiguration: {
        path: "/",
        interval: 20,
      },
      instanceConfiguration: {
        instanceRoleArn: instanceRole.roleArn,
        cpu: props.config.stage === "main" ? "1024" : "256",
        memory: props.config.stage === "main" ? "2048" : "512",
      },
      networkConfiguration: {
        egressConfiguration: {
          egressType: "VPC",
          vpcConnectorArn: vpcConnector.attrVpcConnectorArn,
        },
      },

      serviceName: `${id}-apprunner`,
    })
  }
}
