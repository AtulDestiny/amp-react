import { a } from "@aws-amplify/backend";
import { Article } from "../data/models/article";

export const GetArticle = a
  .query()
  .arguments({
    id: a.string().required(),
  })
  .returns(a.json())
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "../functions/dynamoDB/get/handler.ts",
    })
  );

export const ListArticles = a
  .query()
  .returns(a.json())
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "../functions/dynamoDB/list/handler.ts",
    })
  );

export const AddArticle = a
  .mutation()
  .arguments({
   input: a.json().required(),
  })
  .returns(Article)
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "../functions/dynamoDB/add/handler.ts",
    })
  );

export const UpdateArticle = a
  .mutation()
  .arguments({
    input: a.json().required(),
  })
  .returns(Article)
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "../functions/dynamoDB/update/handler.ts",
    })
  );

export const DeleteArticle = a
  .mutation()
  .arguments({
    id: a.string().required(),
  })
  .returns(Article)
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "../functions/dynamoDB/delete/handler.ts",
    })
  );
