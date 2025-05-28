import { a, defineFunction } from "@aws-amplify/backend";
import { Article } from "../models/article";

export const GetArticle = a
  .query()
  .arguments({
    id: a.string().required(),
  })
  .returns(Article)
  .handler(async (event: any, context: any) => {
    return context.db.Article.get({
      id: event.arguments.id,
    });
  });
