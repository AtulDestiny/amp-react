import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

import { Article } from "./models/article";
import {
  GetArticle,
  ListArticles,
  GetArticleById,
} from "./queries/article.query";

import { Author } from "./models/author";

const schema = a.schema({
  Article,
  GetArticle,
  ListArticles,
  GetArticleById,

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
