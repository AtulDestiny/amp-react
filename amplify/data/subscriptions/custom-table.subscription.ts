import { a, defineFunction } from "@aws-amplify/backend";

export const AddCustomMethodSubsacription = a
  .subscription()
  // subscribes to the 'AddCustomMethodCustomMutation' mutation
  .for(a.ref("AddCustomMethodCustomMutation"))
  // subscription handler to set custom filters
  .handler(
    a.handler.custom({
      entry: "../../functions/execute-flow/handler.ts",
    })
  )
  // authorization rules as to who can subscribe to the data
  .authorization((allow) => [allow.publicApiKey()]);
