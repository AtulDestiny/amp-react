import { a } from "@aws-amplify/backend";
import { executeFlowFunction } from "../functions/execute-flow/resource";

export const ExecuteFlow = a
  .mutation()
  .arguments({
    stateMachineArn: a.string().default('arn:aws:states:us-east-1:992382535498:stateMachine:dev_d3nh2xvu5kckmx_todos_flow_cb67'),
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
  .handler(a.handler.function(executeFlowFunction));
