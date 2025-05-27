import {
  a,
} from '@aws-amplify/backend';
import {
  Author,
} from '../models/author';

export const GetAuthor = a.query()
  .arguments({
    id: a.string().required(),
  })
  .returns(Author)
  .resolve(({
    args, ctx,
  }) => {
    return ctx.db.Author.get({
      id: args.id,
    });
  });

export const ListAuthors = a.query()
  .returns(a.array(Author))
  .resolve(({
    ctx,
  }) => {
    return ctx.db.Author.list();
  });

export const GetAuthorById = a.query()
  .arguments({
    id: a.string().required(),
  })
  .returns(Author)
  .resolve(async ({
    args, ctx,
  }) => {
    return ctx.db.Author.get({
      id: args.id,
    });
  });
