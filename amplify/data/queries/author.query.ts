import { a } from "@aws-amplify/backend";
import { Author } from "../models/author";

export const GetAuthor = a.query({
  arguments: {
    id: a.string().required(),
  },
  returns: Author,
  handler: a.handler.sync((input) => {
    const { args, ctx } = input;
    return ctx.db.Author.get({ id: args.id });
  }),
});

export const ListAuthors = a.query({
  returns: a.ref(Array.of(Author)),
  handler: a.handler.sync((input) => {
    const { ctx } = input;
    return ctx.db.Author.list();
  }),
});

export const GetAuthorById = a.query({
  arguments: {
    id: a.string().required(),
  },
  returns: Author,
  handler: a.handler.sync(async (input) => {
    const { args, ctx } = input;
    return ctx.db.Author.get({ id: args.id });
  }),
});
