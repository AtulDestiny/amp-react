import { a } from "@aws-amplify/backend";
import { Article } from "../models/article";

export const GetArticle = a
  .query()
  .arguments({
    id: a.string().required(),
  })
  .returns(Article)
  .resolver(({ args, ctx }) => {
    return ctx.db.Article.get({ id: args.id });
  });

export const ListArticles = a
  .query()
  .returns(a.list(Article))
  .resolver(({ ctx }) => {
    return ctx.db.Article.list();
  });

export const GetArticleById = a
  .query()
  .arguments({
    id: a.string().required(),
  })
  .returns(Article)
  .resolver(({ args, ctx }) => {
    return ctx.db.Article.get({ id: args.id });
  });
