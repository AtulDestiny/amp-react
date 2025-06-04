import { Amplify } from "aws-amplify";

Amplify.configure({
  Storage: {
    S3: {
      bucket: "brand-workload-content-dx0n-eocw-s3-dev", // your custom bucket name
      region: "us-east-1",
      buckets: {
        "brand-workload-content-dx0n-eocw-s3-dev": {
          bucketName: "brand-workload-content-dx0n-eocw-s3-dev",
          region: "us-east-1"
        }
      }
    }
  }
});
