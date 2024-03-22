import * as cdk from 'aws-cdk-lib'
import * as ecr from 'aws-cdk-lib/aws-ecr'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { AppRunner } from '../construct/apprunner'
import { Construct } from 'constructs'
import { Config } from '../config'

interface AppProps {
  repository: ecr.Repository
  vpc: ec2.Vpc
  appRunnerSecurityGroup: ec2.SecurityGroup
  config: Config
}

export class GashaAppStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props: cdk.StackProps,
    appProps: AppProps
  ) {
    super(scope, id, props)

    const { repository, vpc, appRunnerSecurityGroup, config } = appProps

    new AppRunner(this, 'AppRunner', {
      vpc,
      repository,
      appRunnerSecurityGroup,
      config,
    })
  }
}
