import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

import { TestCustomEntity } from "./models/test-custom-entity";

import { Article } from "./models/article";

import { Author } from "./models/author";

import { GetFileS3 } from "../customResolvers/getFileS3";

import { UploadFileS3 } from "../customResolvers/uploadFileS3";

const schema = a.schema({
  TestCustomEntity,
  Article,
  Author,
  GetFileS3,
  UploadFileS3,
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
