import { Construct } from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'

export class Network extends Construct {
  readonly vpc: ec2.Vpc
  readonly ec2BastionSecurityGroup: ec2.SecurityGroup
  readonly dbSecurityGroup: ec2.SecurityGroup
  readonly appRunnerSecurityGroup: ec2.SecurityGroup

  constructor(scope: Construct, id: string) {
    super(scope, id)

    this.vpc = new ec2.Vpc(this, 'Gasha-VPC', {
      maxAzs: 2,
      cidr: '10.250.0.0/16',
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Gasha-Public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'Gasha-Protected',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          cidrMask: 24,
          name: 'Gasha-Private',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    })

    this.appRunnerSecurityGroup = new ec2.SecurityGroup(
      scope,
      'Gasha-AppRunner-SG',
      {
        allowAllOutbound: true,
        securityGroupName: 'Gasha-AppRunner-SG',
        vpc: this.vpc,
      }
    )

    this.ec2BastionSecurityGroup = new ec2.SecurityGroup(
      scope,
      'Gasha-Bastion-SG',
      {
        allowAllOutbound: true,
        securityGroupName: 'Gasha-Bastion-SG',
        vpc: this.vpc,
      }
    )

    this.ec2BastionSecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allow SSH from anywhere'
    )

    this.dbSecurityGroup = new ec2.SecurityGroup(scope, 'Gasha-DB-SG', {
      allowAllOutbound: true,
      securityGroupName: 'Gasha-DB-SG',
      vpc: this.vpc,
    })

    this.dbSecurityGroup.addIngressRule(
      this.appRunnerSecurityGroup,
      ec2.Port.tcp(3306),
      'Allow AppRunner to access the database'
    )

    this.dbSecurityGroup.addIngressRule(
      this.ec2BastionSecurityGroup,
      ec2.Port.tcp(3306),
      'Allow Bastion to access the database'
    )
  }
}
