import { Construct } from 'constructs'
import { RemovalPolicy } from 'aws-cdk-lib'
import * as ecr from 'aws-cdk-lib/aws-ecr'
import { Config } from '../config'

interface EcrRepositoryProps {
  config: Config
}
export class EcrRepository extends Construct {
  readonly repository: ecr.Repository

  constructor(scope: Construct, id: string, props: EcrRepositoryProps) {
    super(scope, id)

    this.repository = new ecr.Repository(scope, 'Gasha-Repository', {
      repositoryName: `${props.config.stage}-gasha-repository`,
      removalPolicy: RemovalPolicy.RETAIN,
      imageScanOnPush: true,
    })

    this.repository.addLifecycleRule({
      tagStatus: ecr.TagStatus.ANY,
      maxImageCount: 10,
      description: 'Remove old images',
    })
  }
}
