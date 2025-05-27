import { a } from "@aws-amplify/backend";
import { Author } from "../models/author";

export const CreateAuthor = a
  .mutation()
  .arguments({
    id: a.string(),
    name: a.string(),
    email: a.string(),
  })
  .returns(Author)
  .resolve(async ({ args, ctx }) => {
    return await ctx.db.Author.create(args);
  });

export const UpdateAuthor = a
  .mutation()
  .arguments({
    id: a.string().required(),
    name: a.string(),
    email: a.string(),
  })
  .returns(Author)
  .resolve(async ({ args, ctx }) => {
    const { id, ...updates } = args;
    return await ctx.db.Author.update({
      id,
      updates,
    });
  });

export const DeleteAuthor = a
  .mutation()
  .arguments({
    id: a.string().required(),
  })
  .returns(a.boolean())
  .resolve(async ({ args, ctx }) => {
    await ctx.db.Author.delete({
      id: args.id,
    });
    return true;
  });
