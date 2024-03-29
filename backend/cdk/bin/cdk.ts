#!/usr/bin/env node
import 'source-map-support/register'
import { GashaInitStack } from '../lib/init-stack'
import * as cdk from 'aws-cdk-lib'
import { getConfig } from '../config'
import { GashaAppStack } from '../lib/app-stack'
import { GashaRdsStack } from '../lib/rds-stack'

const app = new cdk.App()

const stages = ['test', 'main-stg', 'main']
const stage = app.node.tryGetContext('stage')
if (!stages.includes(stage)) {
  throw new Error(`stage must be one of ${stages.join(', ')}`)
}

const config = getConfig(stage)
const serviceName = 'Gasha'

const env = {
  account: config.aws.accountId,
  region: config.aws.region,
}

const { vpc, ec2BastionSecurityGroup } = new GashaInitStack(
  app,
  `${serviceName}InitStack`,
  {
    description: 'Gasha Init Stack',
    tags: {
      service: serviceName,
    },
    env,
  }
)

const { appRunnerSecurityGroup } = new GashaRdsStack(
  app,
  `${stage}${serviceName}RdsStack`,
  {
    description: 'Gasha RDS Stack',
    tags: {
      service: serviceName,
      environment: stage,
    },
    env,
  },
  {
    vpc,
    config,
    ec2BastionSecurityGroup,
  }
)

new GashaAppStack(
  app,
  `${stage}${serviceName}AppStack`,
  {
    description: 'Gasha AppRunner Stack',
    tags: {
      service: serviceName,
      environment: stage,
    },
    env,
  },
  {
    vpc,
    config,
    appRunnerSecurityGroup,
  }
)
