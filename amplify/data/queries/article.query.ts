import { a, defineFunction } from "@aws-amplify/backend";
import { Article } from "../models/article";

const articleHandler = defineFunction({
  entry: "../handlers/article-handler.ts",
});

export const GetArticle = a
  .query()
  .arguments({ id: a.string().required() })
  .returns(Article)
  .authorization((allow) => [allow.publicApiKey()])
  // .handler(a.handler.function(getArticleFunction));
  .handler(a.handler.function(articleHandler));

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
