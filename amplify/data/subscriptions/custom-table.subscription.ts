import { a, defineFunction } from "@aws-amplify/backend";

export const AddCustomMethodSubsacription = a
  .subscription()
  // subscribes to the 'publish' mutation
  .for(a.ref("AddCustomMethodCustomMutation"))
  // subscription handler to set custom filters
  .handler(
    a.handler.custom({
      entry: "../../functions/execute-flow/handler.ts",
      timeoutSeconds: 900,
      environment: {
        STATE_MACHINE_ARN:
          "arn:aws:states:us-east-1:992382535498:stateMachine:dev_d3nh2xvu5kckmx_todos_flow_cb67",
      },
    })
  )
  // authorization rules as to who can subscribe to the data
  .authorization((allow) => [allow.publicApiKey()]);
