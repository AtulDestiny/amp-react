import { a, defineQuery } from "@aws-amplify/backend";
import { Article } from "../models/article";

export const GetArticle = defineQuery({
  name: "GetArticle",
  arguments: {
    id: a.string().required(),
  },
  returns: Article,
  resolve: async ({ args, ctx }) => {
    return ctx.db.Article.get({ id: args.id });
  },
});

export const ListArticles = defineQuery({
  name: "ListArticles",
  returns: a.array(Article),
  resolve: async ({ ctx }) => {
    return ctx.db.Article.list();
  },
});

export const GetArticleById = defineQuery({
  name: "GetArticleById",
  arguments: {
    id: a.string().required(),
  },
  returns: Article,
  resolve: async ({ args, ctx }) => {
    return ctx.db.Article.get({ id: args.id });
  },
});
