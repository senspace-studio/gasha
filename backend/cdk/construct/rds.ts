import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as rds from 'aws-cdk-lib/aws-rds'
import { Construct } from 'constructs'

interface RdsProps {
  vpc: ec2.Vpc
  dbSecurityGroup: ec2.SecurityGroup
}

export class Rds extends Construct {
  constructor(scope: Construct, id: string, props: RdsProps) {
    super(scope, id)

    const { vpc, dbSecurityGroup } = props

    const rdsCredentials = rds.Credentials.fromGeneratedSecret('admin', {
      secretName: 'gasha-db-secret',
    })

    const instanceParameterGroup = new rds.ParameterGroup(
      scope,
      'Gasha-DB-InstanceParameterGroup',
      {
        engine: rds.DatabaseInstanceEngine.mysql({
          version: rds.MysqlEngineVersion.VER_8_0_28,
        }),
        description: 'Gasha DB Instance Parameter Group',
      }
    )

    new rds.DatabaseInstance(scope, 'Gasha-DB', {
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0_28,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.SMALL
      ),
      multiAz: false,
      allocatedStorage: 16,
      maxAllocatedStorage: 32,
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      credentials: rdsCredentials,
      securityGroups: [dbSecurityGroup],
      parameterGroup: instanceParameterGroup,
      databaseName: 'gasha',
    })
  }
}
