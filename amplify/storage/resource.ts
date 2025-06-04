import { defineStorage } from '@aws-amplify/backend';
import { aws_s3 as s3 } from 'aws-cdk-lib';

export const storage = defineStorage({
  name: 'amplifyTeamDrive',
  configure: (context) => {
    const existingBucket = s3.Bucket.fromBucketName(
      context.scope,
      'ExistingBucket',
      'dev-application-lambdas'
    );

    return {
      bucket: existingBucket,
    };
  },
});
