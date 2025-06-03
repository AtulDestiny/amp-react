import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

import { TestCustomEntity } from "./models/test-custom-entity";

import { Article } from "./models/article";

import { Author } from "./models/author";

const schema = a.schema({
  TestCustomEntity,
  Article,
  Author,
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
