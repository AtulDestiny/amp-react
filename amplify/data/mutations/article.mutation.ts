import { a } from "@aws-amplify/backend";
import { Article } from "../models/article";

export const CreateArticle = a.mutation({
  arguments: {
    id: a.string(),
    title: a.string(),
    content: a.string(),
    createdAt: a.datetime(),
    authorId: a.string(),
  },
  returns: Article,
  handler: a.handler.custom(async (input) => {
    const { args, ctx } = input;
    return await ctx.db.Article.create(args);
  }),
});

export const UpdateArticle = a.mutation({
  arguments: {
    id: a.string().required(),
    title: a.string(),
    content: a.string(),
    createdAt: a.datetime(),
    authorId: a.string(),
  },
  returns: Article,
  handler: a.handler.custom(async (input) => {
    const { args, ctx } = input;
    const { id, ...updates } = args;
    // Depending on your db client, adjust this call
    return await ctx.db.Article.update({ id, ...updates });
  }),
});

export const DeleteArticle = a.mutation({
  arguments: {
    id: a.string().required(),
  },
  returns: a.boolean(),
  handler: a.handler.custom(async (input) => {
    const { args, ctx } = input;
    await ctx.db.Article.delete({ id: args.id });
    return true;
  }),
});
