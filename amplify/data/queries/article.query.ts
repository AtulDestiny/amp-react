import { a, defineFunction } from "@aws-amplify/backend";
import { Article } from "../models/article";

// Define the handler function
const getArticleHandler = defineFunction({
  entry: "./handlers/get-article.handler.ts",
});

export const GetArticle = a
  .query()
  .arguments({
    id: a.string().required(),
  })
  .returns(Article)
  .handler(a.handler.function(getArticleHandler));
