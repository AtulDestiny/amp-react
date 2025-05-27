import { a } from "@aws-amplify/backend";
import { Article } from "../models/article";

export const GetArticle = a.query({
  arguments: {
    id: a.string().required(),
  },
  returns: Article,
  handler: a.handler.sync((input) => {
    const { args, ctx } = input;
    return ctx.db.Article.get({ id: args.id });
  }),
});

export const ListArticles = a.query({
  returns: a.ref(Array.of(Article)),
  handler: a.handler.sync((input) => {
    const { ctx } = input;
    return ctx.db.Article.list();
  }),
});

export const GetArticleById = a.query({
  arguments: {
    id: a.string().required(),
  },
  returns: Article,
  handler: a.handler.sync(async (input) => {
    const { args, ctx } = input;
    return ctx.db.Article.get({ id: args.id });
  }),
});
