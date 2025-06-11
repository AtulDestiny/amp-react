import { a, defineFunction } from "@aws-amplify/backend";

export const AddCustomMethodCustomMutationFunction = defineFunction({
    name: "AddCustomMethodCustomMutation",
    entry: "../../functions/execute-flow/handler.ts",
    timeoutSeconds: 900,
    environment : {
      STATE_MACHINE_ARN : "arn:aws:states:us-east-1:992382535498:stateMachine:dev_d3nh2xvu5kckmx_todos_flow_cb67",
      PAYLOAD : JSON.stringify({ limit : 5 }),
    }
  })

export const AddCustomMethodCustomMutation = a
  .mutation()
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
  .handler(a.handler.function(AddCustomMethodCustomMutationFunction));
