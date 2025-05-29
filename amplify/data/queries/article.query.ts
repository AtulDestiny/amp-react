import { a, defineFunction } from "@aws-amplify/backend";
import { Article } from "../models/article";

// const articleHandler = defineFunction({
//   entry: "./handlers/article.handler.ts",
// });

export const GetArticle = a
  .query()
  .arguments({ id: a.string().required() })
  .returns(Article)
  .authorization((allow) => [allow.publicApiKey()])
  .handler(async (event: { arguments: { id: string } }, context: any) => {
    return context.db.Article.get({
      id: event.arguments.id,
    });
  });
