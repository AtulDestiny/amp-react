import { a, defineFunction } from "@aws-amplify/backend";

export const testCustomMethodCustomMutationFunction = defineFunction({
    name: "testCustomMethodCustomMutation",
    entry: "../../functions/execute-flow/handler.ts",
    timeoutSeconds: 900,
    environment : {
      STATE_MACHINE_ARN : "arn:aws:states:us-east-1:992382535498:express:dev_d3nh2xvu5kckmx_user_sync_flow_ab12"
    }
  });

export const testCustomMethodCustomMutation = a
  .mutation()
  .arguments({
    stateMachineArn: a.string().required(),
    payload: a.json().required(),
  })
  .returns(
    a.customType({
      executedVersion: a.string(),
      statusCode: a.integer().required(),
      logOutput: a.string().required(),
      duration: a.string().required(),
      billedDuration: a.string().required(),
      memorySize: a.string().required(),
      maxMemoryUsed: a.string().required(),
      requestId: a.string().required(),
      responsePayload: a.json(),
      errorMessage: a.string(),
      errorType: a.string(),
      functionError: a.string(),
    })
  )
  .authorization((allow) => [allow.publicApiKey()])
  .handler(a.handler.function(testCustomMethodCustomMutationFunction));
