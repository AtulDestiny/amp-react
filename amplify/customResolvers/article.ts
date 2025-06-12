import { a } from "@aws-amplify/backend";
import { addFunction } from "../functions/dynamoDB/add/resource";
import { getFunction } from "../functions/dynamoDB/get/resource";
import { updateFunction } from "../functions/dynamoDB/update/resource";
import { deleteFunction } from "../functions/dynamoDB/delete/resource";
import { listFunction } from "../functions/dynamoDB/list/resource";

export const GetArticle = a
  .query()
  .arguments({
    id: a.id().required(),
  })
  .returns(a.ref("Article"))
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "./functions/DynamoDB/get/handler.ts",
    })
  );

export const ListArticles = a
  .query()
  .returns(a.ref("Article").array())
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "./functions/DynamoDB/list/handler.ts",
    })
  );

export const AddArticle = a
  .mutation()
  .arguments({
    id: a.id(),
    title: a.string().required(),
    content: a.string().required(),
    createdAt: a.datetime().required(),
    authorId: a.string().required(),
  })
  .returns(a.ref("Article"))
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "./functions/DynamoDB/add/handler.ts",
    })
  );

export const UpdateArticle = a
  .mutation()
  .arguments({
    id: a.id().required(),
    title: a.string(),
    content: a.string(),
    createdAt: a.datetime(),
    authorId: a.string(),
  })
  .returns(a.ref("Article"))
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "./functions/DynamoDB/update/handler.ts",
    })
  );

export const DeleteArticle = a
  .mutation()
  .arguments({
    id: a.id().required(),
  })
  .returns(a.ref("Article"))
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "./functions/DynamoDB/delete/handler.ts",
    })
  );
