import { a } from "@aws-amplify/backend";
import { executeFlowFunction } from "../functions/execute-flow/resource";

export const ExecuteFlow = a
  .mutation()
  .arguments({
    stateMachineArn: a.string().required(),
    payload: a.json().required(),
  })
  .returns(
    a.customType({
      logs: a.string().required(),
    })
  )
  .authorization((allow) => [allow.publicApiKey()])
  .handler(a.handler.function(executeFlowFunction));
