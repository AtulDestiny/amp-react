import { a } from "@aws-amplify/backend";
import { Article } from "../models/article";
import { getArticleFunction } from "../handlers/article/resource";

export const GetArticle = a
  .query()
  .arguments({ id: a.string().required() })
  .returns(Article)
  .authorization((allow) => [allow.publicApiKey()])
  .handler(a.handler.function(getArticleFunction));

// export const ListArticles = a
//   .query()
//   .returns(a.array(Article))
//   .resolve(({ ctx }) => {
//     return ctx.db.Article.list();
//   });

// export const GetArticleById = a
//   .query()
//   .arguments({
//     id: a.string().required(),
//   })
//   .returns(Article)
//   .resolve(async ({ args, ctx }) => {
//     return ctx.db.Article.get({
//       id: args.id,
//     });
//   });
