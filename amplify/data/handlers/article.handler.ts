// import type { FunctionHandler } from "@aws-amplify/backend";
// import { Article } from "../models/article";

// export type GetArticleArgs = { id: string };
// export type GetArticleReturn = typeof Article;

// export const handler: FunctionHandler<
//   GetArticleArgs,
//   GetArticleReturn
// > = async (event, context) => {
//   return context.db.Article.get({
//     id: event.arguments.id,
//   });
// };

// import { Article } from "../models/article";

export const handler = async (
  event: { arguments: { id: string } },
  context: any
) => {
  return context.db.Article.get({
    id: event.arguments.id,
  });
};
