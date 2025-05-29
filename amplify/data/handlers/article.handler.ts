import type { FunctionHandler } from "@aws-amplify/backend";
import { Article } from "../models/article";

export type GetArticleArgs = { id: string };
export type GetArticleReturn = typeof Article;

export const handler: FunctionHandler<
  GetArticleArgs,
  GetArticleReturn
> = async (event, context) => {
  return context.db.Article.get({
    id: event.arguments.id,
  });
};
