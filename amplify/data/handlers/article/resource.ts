import { defineFunction } from "@aws-amplify/backend";

export const getArticleFunction = defineFunction({
  name: "get-article-function",
  entry: "./handler.ts",
  environment: {},
});
