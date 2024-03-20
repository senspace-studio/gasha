#!/usr/bin/env node
import 'source-map-support/register'
import { GashaInitStack } from '../lib/init-stack'
import { GashaAppStack } from '../lib/apprunner-stack'
import * as cdk from 'aws-cdk-lib'
import { getConfig } from '../config'

const app = new cdk.App()

const stages = ['test', 'main']
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

const { vpc, repository, appRunnerSecurityGroup } = new GashaInitStack(
  app,
  `${stage}${serviceName}InitStack`,
  {
    description: 'Gasha Init Stack',
    tags: {
      service: serviceName,
      environment: stage,
    },
    env,
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
    repository,
    vpc,
    appRunnerSecurityGroup,
    dbSecretSuffix: config.dbSecretSuffix,
  }
)
