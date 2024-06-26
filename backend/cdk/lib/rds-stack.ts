import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { SecurityGroup } from '../construct/sg'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { Config } from '../config'
import { Rds } from '../construct/rds'

interface AppProps {
  vpc: ec2.Vpc
  config: Config
  ec2BastionSecurityGroup: ec2.SecurityGroup
}

export class GashaRdsStack extends Stack {
  readonly appRunnerSecurityGroup: ec2.SecurityGroup

  constructor(
    scope: Construct,
    id: string,
    props: StackProps,
    appProps: AppProps
  ) {
    super(scope, id, props)

    const { vpc, config, ec2BastionSecurityGroup } = appProps

    const { appRunnerSecurityGroup, dbSecurityGroup } = new SecurityGroup(
      this,
      'SecurityGroup',
      {
        vpc,
        config,
        ec2BastionSecurityGroup,
      }
    )

    new Rds(this, 'Rds', {
      vpc,
      dbSecurityGroup,
      config,
    })

    this.appRunnerSecurityGroup = appRunnerSecurityGroup
  }
}
