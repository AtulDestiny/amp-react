import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { Article } from "./models/article";
import { Author } from "./models/author";
import { GetFileS3 } from "../customResolvers/getFileS3";
import { UploadFileS3 } from "../customResolvers/uploadFileS3";
import { ExecuteFlow } from "../customResolvers/executeFlow";
import { ListFilesS3 } from "../customResolvers/listFilesS3";

const schema = a.schema({
  Article,
  Author,
  GetFileS3,
  UploadFileS3,
  ExecuteFlow,
  ListFilesS3,
  addItem: a
    .mutation()
    .arguments({
      id: a.id(),
      name: a.string().required(),
    })
    .returns(a.ref("Author"))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(
      a.handler.custom({
        dataSource: "AuthorTableDataSource",
        entry: "./addItem.ts",
      })
    ),
  // getItem: a
  //   .query()
  //   .arguments({
  //     id: a.id().required(),
  //   })
  //   .returns(a.ref("Author"))
  //   .authorization((allow) => [allow.publicApiKey()])
  //   .handler(
  //     a.handler.custom({
  //       dataSource: "AuthorTableDataSource",
  //       entry: "./getItem.ts",
  //     })
  //   ),
  // updateItem: a
  //   .mutation()
  //   .arguments({
  //     id: a.id().required(),
  //     name: a.string().required(),
  //   })
  //   .returns(a.ref("Author"))
  //   .authorization((allow) => [allow.publicApiKey()])
  //   .handler(
  //     a.handler.custom({
  //       dataSource: "AuthorTableDataSource",
  //       entry: "./updateItem.ts",
  //     })
  //   ),
  // deleteItem: a
  //   .mutation()
  //   .arguments({
  //     id: a.id().required(),
  //   })
  //   .returns(a.ref("Author"))
  //   .authorization((allow) => [allow.publicApiKey()])
  //   .handler(
  //     a.handler.custom({
  //       dataSource: "AuthorTableDataSource",
  //       entry: "./deleteItem.ts",
  //     })
  //   ),
  // listItems: a
  //   .query()
  //   .returns(a.ref("Author").array())
  //   .authorization((allow) => [allow.publicApiKey()])
  //   .handler(
  //     a.handler.custom({
  //       dataSource: "AuthorTableDataSource",
  //       entry: "./listItems.ts",
  //     })
  //   ),
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
