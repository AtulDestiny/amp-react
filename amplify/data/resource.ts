import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

import { AtulTestAmpApp } from "./models/atul-test-amp-app";

import { Article } from "./models/article";

import { Author } from "./models/author";

const schema = a.schema({
  AtulTestAmpApp,
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
