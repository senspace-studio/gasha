import { Stack, StackProps } from 'aws-cdk-lib'
import * as ecr from 'aws-cdk-lib/aws-ecr'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { Network } from '../construct/network'
import { EcrRepository } from '../construct/ecr'
import { Rds } from '../construct/rds'
import { Construct } from 'constructs'
import { EC2Bastion } from '../construct/ec2_bastion'
import { Config } from '../config'

interface InitProps {
  config: Config
}

export class GashaInitStack extends Stack {
  readonly repository: ecr.Repository
  readonly vpc: ec2.Vpc
  readonly appRunnerSecurityGroup: ec2.SecurityGroup

  constructor(
    scope: Construct,
    id: string,
    props: StackProps,
    initProps: InitProps
  ) {
    super(scope, id, props)

    const {
      vpc,
      dbSecurityGroup,
      ec2BastionSecurityGroup,
      appRunnerSecurityGroup,
    } = new Network(this, 'Network')

    const { repository } = new EcrRepository(this, 'Ecr', initProps)

    new EC2Bastion(this, 'EC2Bastion', {
      vpc,
      securityGroup: ec2BastionSecurityGroup,
    })

    new Rds(this, 'Rds', { vpc, dbSecurityGroup })

    this.repository = repository
    this.vpc = vpc
    this.appRunnerSecurityGroup = appRunnerSecurityGroup
  }
}
