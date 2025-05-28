import {
  a,
} from '@aws-amplify/backend';
import {
  Article,
} from '../models/article';

export const GetArticle = a.query()
  .arguments({
    id: a.string().required(),
  })
  .returns(Article)
  .resolve(({
    args, ctx,
  }) => {
    return ctx.db.Article.get({
      id: args.id,
    });
  });

export const ListArticles = a.query()
  .returns(a.array(Article))
  .resolve(({
    ctx,
  }) => {
    return ctx.db.Article.list();
  });

export const GetArticleById = a.query()
  .arguments({
    id: a.string().required(),
  })
  .returns(Article)
  .resolve(async ({
    args, ctx,
  }) => {
    return ctx.db.Article.get({
      id: args.id,
    });
  });
