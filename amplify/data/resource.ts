import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

import { Author } from "./models/author";

import { Article } from "./models/article";

const schema = a.schema({
  Author,
  Article,
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
