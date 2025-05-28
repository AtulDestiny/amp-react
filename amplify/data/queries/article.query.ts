import { a } from "@aws-amplify/backend";
import { Article } from "../models/article";

export const GetArticle = a
  .query()
  .arguments({
    id: a.string().required(),
  })
  .returns(Article)
  .handler(async (event, context) => {
    return context.db.Article.get({
      id: event.arguments.id,
    });
  });
