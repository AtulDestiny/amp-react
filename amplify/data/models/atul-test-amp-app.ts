import { a } from "@aws-amplify/backend";

export const AtulTestAmpApp = a
  .model({
    aId: a
      .string()
      .authorization((allow: any) => [
        allow.publicApiKey().to(["read"]),
        allow.authenticated().to(["read"]),
      ]),
    field1: a
      .string()
      .authorization((allow: any) => [
        allow.publicApiKey().to(["read"]),
        allow.authenticated().to(["read"]),
      ]),
    field2: a
      .string()
      .authorization((allow: any) => [
        allow.publicApiKey().to(["read"]),
        allow.authenticated().to(["read"]),
      ]),
  })
  .authorization((allow: any) => [
    allow.publicApiKey().to(["read"]),
    allow.authenticated().to(["read"]),
  ]);
