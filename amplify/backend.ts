import { defineBackend } from "@aws-amplify/backend";
import { Effect, Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { aws_dynamodb as ddb } from "aws-cdk-lib";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { getS3Function } from "./functions/get-s3/resource";
import { uploadS3Function } from "./functions/upload-s3/resource";
import { executeFlowFunction } from "./functions/execute-flow/resource";
import { listS3Function } from "./functions/list-s3/resource";
import { addFunction } from "./functions/dynamoDB/add/resource";
import { updateFunction } from "./functions/dynamoDB/update/resource";
import { getFunction } from "./functions/dynamoDB/get/resource";
import { deleteFunction } from "./functions/dynamoDB/delete/resource";
import { listFunction } from "./functions/dynamoDB/list/resource";

const REGION = "us-east-1";
const customBucketArn = "arn:aws:s3:::brand-workload-content-dx0n-eocw-s3-dev";

export const backend = defineBackend({
  auth,
  data,
  getS3Function,
  uploadS3Function,
  listS3Function,
  executeFlowFunction,
  addFunction,
  updateFunction,
  getFunction,
  deleteFunction,
  listFunction,
});

const customBucketStack = backend.createStack("custom-bucket-stack");
const targetLambdaArn = "arn:aws:lambda:us-east-1:992382535498:function:test-dev-amplify-app";
const targetTableArn = "arn:aws:dynamodb:us-east-1:992382535498:table/Article-5p3j4x7cxbejlib64lfezxryiu-NONE";

const customBucket = Bucket.fromBucketAttributes(
  customBucketStack,
  "MyCustomBucket",
  {
    bucketArn: customBucketArn,
    region: REGION,
  }
);

backend.addOutput({
  storage: {
    aws_region: REGION,
    bucket_name: customBucket.bucketName,
    buckets: [
      {
        aws_region: REGION,
        bucket_name: customBucket.bucketName,
        name: customBucket.bucketName,
        paths: {
          "public/*": {
            guest: ["get", "list"],
          },
        },
      },
    ],
  },
});

const unauthPolicy = new Policy(backend.stack, "customBucketUnauthPolicy", {
  statements: [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:GetObject"],
      resources: [`${customBucket.bucketArn}/public/*`],
    }),
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:ListBucket"],
      resources: [`${customBucket.bucketArn}`],
      conditions: {
        StringLike: {
          "s3:prefix": ["public/", "public/*"],
        },
      },
    }),
  ],
});

if (backend.auth?.resources?.unauthenticatedUserIamRole) {
  backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(
    unauthPolicy
  );
}

if (backend.getS3Function.resources.lambda.role) {
  backend.getS3Function.resources.lambda.role.addToPrincipalPolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:GetObject"],
      resources: [`${customBucket.bucketArn}/*`],
    })
  );
}

if (backend.listS3Function.resources.lambda.role) {
  backend.listS3Function.resources.lambda.role.addToPrincipalPolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:ListBucket"],
      resources: [customBucket.bucketArn],
    })
  );
  backend.listS3Function.resources.lambda.role.addToPrincipalPolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:GetObject"],
      resources: [`${customBucket.bucketArn}/*`],
    })
  );
}

if (backend.uploadS3Function.resources.lambda.role) {
  backend.uploadS3Function.resources.lambda.role.addToPrincipalPolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:PutObject"],
      resources: [`${customBucket.bucketArn}/*`],
    })
  );
}

if (backend.executeFlowFunction.resources.lambda.role) {
  backend.executeFlowFunction.resources.lambda.role.addToPrincipalPolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["lambda:InvokeFunction"],
      resources: [targetLambdaArn],
    })
  );
}

if (backend.addFunction.resources.lambda.role) {
  backend.addFunction.resources.lambda.role.addToPrincipalPolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["dynamodb:PutItem"],
      resources: [targetTableArn],
    })
  )
}

if (backend.updateFunction.resources.lambda.role) {
  backend.updateFunction.resources.lambda.role.addToPrincipalPolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["dynamodb:UpdateItem"],
      resources: [targetTableArn],
    })
  )
}

if (backend.getFunction.resources.lambda.role) {
  backend.getFunction.resources.lambda.role.addToPrincipalPolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["dynamodb:GetItem"],
      resources: [targetTableArn],
    })
  )
}

if (backend.deleteFunction.resources.lambda.role) {
  backend.deleteFunction.resources.lambda.role.addToPrincipalPolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["dynamodb:DeleteItem"],
      resources: [targetTableArn],
    })
  )
}

if (backend.listFunction.resources.lambda.role) {
  backend.listFunction.resources.lambda.role.addToPrincipalPolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["dynamodb:Scan"],
      resources: [targetTableArn],
    })
  )
}

const customTableStack = backend.createStack("ExternalTables");

const AuthorTable = ddb.Table.fromTableName(customTableStack, "AuthorTable", "Author-5p3j4x7cxbejlib64lfezxryiu-NONE");
const ArticleTable = ddb.Table.fromTableName(customTableStack, "ArticleTable", "Article-5p3j4x7cxbejlib64lfezxryiu-NONE");

backend.data.addDynamoDbDataSource("AuthorTableDataSource", AuthorTable);
backend.data.addDynamoDbDataSource("ArticleTableDataSource", ArticleTable);
