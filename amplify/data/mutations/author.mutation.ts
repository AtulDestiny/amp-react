import { a } from "@aws-amplify/backend";
import { Author } from "../models/author";

export const CreateAuthor = a.mutation({
  arguments: {
    id: a.string(),
    name: a.string(),
    email: a.string(),
  },
  returns: Author,
  handler: a.handler.sync(async (input) => {
    const { args, ctx } = input;
    return await ctx.db.Author.create(args);
  }),
});

export const UpdateAuthor = a.mutation({
  arguments: {
    id: a.string().required(),
    name: a.string(),
    email: a.string(),
  },
  returns: Author,
  handler: a.handler.sync(async (input) => {
    const { args, ctx } = input;
    const { id, ...updates } = args;
    return await ctx.db.Author.update({ id, ...updates });
  }),
});

export const DeleteAuthor = a.mutation({
  arguments: {
    id: a.string().required(),
  },
  returns: a.boolean(),
  handler: a.handler.sync(async (input) => {
    const { args, ctx } = input;
    await ctx.db.Author.delete({ id: args.id });
    return true;
  }),
});
