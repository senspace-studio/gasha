import { Construct } from 'constructs'
import { RemovalPolicy } from 'aws-cdk-lib'
import * as ecr from 'aws-cdk-lib/aws-ecr'

export class EcrRepository extends Construct {
  readonly repository: ecr.Repository

  constructor(scope: Construct, id: string) {
    super(scope, id)

    this.repository = new ecr.Repository(scope, 'Gasha-Repository', {
      repositoryName: 'gasha-repository',
      removalPolicy: RemovalPolicy.DESTROY,
      imageScanOnPush: true,
    })

    this.repository.addLifecycleRule({
      tagStatus: ecr.TagStatus.ANY,
      maxImageCount: 10,
      description: 'Remove old images',
    })
  }
}
