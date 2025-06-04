import { Amplify } from "aws-amplify";

Amplify.configure({
  Storage: {
    S3: {
      bucket: "dev-application-lambdas", // your custom bucket name
      region: "us-east-1",
      buckets: {
        "dev-application-lambdas": {
          bucketName: "dev-application-lambdas",
          region: "us-east-1"
        }
      }
    }
  }
});
