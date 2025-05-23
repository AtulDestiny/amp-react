import {
  type ClientSchema,
  a,
  defineData,
} from '@aws-amplify/backend';

import {
  Author,
} from './models/author';
import {
  GetAuthor,
  ListAuthors,
  GetAuthorById,
} from './queries/author.query';
import {
  CreateAuthor,
  UpdateAuthor,
  DeleteAuthor,
} from './mutations/author.mutation';

import {
  Article,
} from './models/article';
import {
  GetArticle,
  ListArticles,
  GetArticleById,
} from './queries/article.query';
import {
  CreateArticle,
  UpdateArticle,
  DeleteArticle,
} from './mutations/article.mutation';


const schema = a.schema({

  Author,
  GetAuthor,
  ListAuthors,
  GetAuthorById,
  CreateAuthor,
  UpdateAuthor,
  DeleteAuthor,

  Article,
  GetArticle,
  ListArticles,
  GetArticleById,
  CreateArticle,
  UpdateArticle,
  DeleteArticle,

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
