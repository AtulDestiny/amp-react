import { a } from "@aws-amplify/backend";

export const TestCustomEntity = a
  .customType({
    id: a
      .string()
      .default("N/A")
      .authorization((allow: any) => [
        allow.publicApiKey().to(["read"]),
        allow.authenticated().to(["read"]),
      ]),
    name: a
      .string()
      .default("N/A")
      .authorization((allow: any) => [
        allow.publicApiKey().to(["read"]),
        allow.authenticated().to(["read"]),
      ]),
  });
