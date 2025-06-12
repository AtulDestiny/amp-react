import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { TestCustomEntity } from "./models/test-custom-entity";
import { Article } from "./models/article";
import { Author } from "./models/author";
import { GetFileS3 } from "../customResolvers/getFileS3";
import { UploadFileS3 } from "../customResolvers/uploadFileS3";
import { ExecuteFlow } from "../customResolvers/executeFlow";
import { ListFilesS3 } from "../customResolvers/listFilesS3";
import {
  GetItem,
  AddItem,
  DeleteItem,
  ListItems,
  UpdateItem,
} from "../customResolvers/dynamoDB";
import {
  GetArticle,
  AddArticle,
  DeleteArticle,
  ListArticles,
  UpdateArticle,
} from "../customResolvers/article";
import {
  GetAuthor,
  AddAuthor,
  DeleteAuthor,
  ListAuthors,
  UpdateAuthor,
} from "../customResolvers/author";

const schema = a.schema({
  TestCustomEntity,
  Article: Article,
  Author: Author,
  GetFileS3,
  UploadFileS3,
  ExecuteFlow,
  ListFilesS3,
  addItem: a
    .mutation()
    .arguments({
      input: a.json().required(),
    })
    .returns(a.json())
    .authorization((allow) => [allow.publicApiKey()])
    .handler(
      a.handler.custom({
        dataSource: "ArticleTableDataSource",
        entry: "./addItem.ts",
      })
    ),
  getItem: a
    .query()
    .arguments({
      id: a.string().required(),
    })
    .returns(a.json())
    .authorization((allow) => [allow.publicApiKey()])
    .handler(
      a.handler.custom({
        dataSource: "ArticleTableDataSource",
        entry: "./getItem.ts",
      })
    ),
  updateItem: a
    .mutation()
    .arguments({
      input: a.json().required(),
    })
    .returns(a.json())
    .authorization((allow) => [allow.publicApiKey()])
    .handler(
      a.handler.custom({
        dataSource: "ArticleTableDataSource",
        entry: "./updateItem.ts",
      })
    ),
  deleteItem: a
    .mutation()
    .arguments({
      id: a.string().required(),
    })
    .returns(a.json())
    .authorization((allow) => [allow.publicApiKey()])
    .handler(
      a.handler.custom({
        dataSource: "ArticleTableDataSource",
        entry: "./deleteItem.ts",
      })
    ),
  listItems: a
    .query()
    .returns(a.json())
    .authorization((allow) => [allow.publicApiKey()])
    .handler(
      a.handler.custom({
        dataSource: "ArticleTableDataSource",
        entry: "./listItems.ts",
      })
    ),
  // GetItem,
  // AddItem,
  // DeleteItem,
  // ListItems,
  // UpdateItem,
  // GetArticle,
  // AddArticle,
  // DeleteArticle,
  // ListArticles,
  // UpdateArticle,
  // GetAuthor,
  // AddAuthor,
  // DeleteAuthor,
  // ListAuthors,
  // UpdateAuthor,
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
