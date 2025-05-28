import { a } from "@aws-amplify/backend";
import { Article } from "../models/article";

export const GetArticle = a.customQuery({
  arguments: {
    id: a.string().required(),
  },
  returns: Article,
  handler: async ({ args, ctx }) => {
    return ctx.db.Article.get({ id: args.id });
  },
});

export const ListArticles = a.customQuery({
  returns: a.array(Article),
  handler: async ({ ctx }) => {
    return ctx.db.Article.list();
  },
});

export const GetArticleById = a.customQuery({
  arguments: {
    id: a.string().required(),
  },
  returns: Article,
  handler: async ({ args, ctx }) => {
    return ctx.db.Article.get({ id: args.id });
  },
});
