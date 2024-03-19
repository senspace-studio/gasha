#!/usr/bin/env node
import 'source-map-support/register'
import { GashaInitStack } from '../lib/init-stack'
import { GashaAppStack } from '../lib/apprunner-stack'
import * as cdk from 'aws-cdk-lib'

const app = new cdk.App()

const { vpc, repository, appRunnerSecurityGroup } = new GashaInitStack(
  app,
  'GashaInitStack',
  {
    description: 'Gasha Init Stack',
    tags: {
      service: 'gasha',
      environment: 'dev',
    },
    env: {
      account: '726394863183',
      region: 'ap-northeast-1',
    },
  }
)

new GashaAppStack(
  app,
  'GashaAppStack',
  {
    description: 'Gasha AppRunner Stack',
    tags: {
      service: 'gasha',
      environment: 'dev',
    },
    env: {
      account: '726394863183',
      region: 'ap-northeast-1',
    },
  },
  {
    repository,
    vpc,
    appRunnerSecurityGroup,
  }
)
