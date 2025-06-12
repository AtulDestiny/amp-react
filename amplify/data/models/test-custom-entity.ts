import { a } from "@aws-amplify/backend";

export const TestCustomEntity = a
  .customType({
    id: a
      .string()
      .authorization((allow: any) => [
        allow.publicApiKey().to(["read"]),
        allow.authenticated().to(["read"]),
      ]),
    name: a
      .string()
      .authorization((allow: any) => [
        allow.publicApiKey().to(["read"]),
        allow.authenticated().to(["read"]),
      ]),
  });
