import { a } from "@aws-amplify/backend";

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
      entry: "../functions/dynamoDB/get/handler.ts",
    })
  );

export const ListArticles = a
  .query()
  .returns(a.ref("Article").array())
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
    id: a.id(),
    title: a.string().required(),
    content: a.string().required(),
    createdAt: a.string().required(),
    authorId: a.string().required(),
  })
  .returns(a.ref("Article"))
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
    id: a.id().required(),
    title: a.string(),
    content: a.string(),
    createdAt: a.string(),
    authorId: a.string(),
  })
  .returns(a.ref("Article"))
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
    id: a.id().required(),
  })
  .returns(a.ref("Article"))
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "../functions/dynamoDB/delete/handler.ts",
    })
  );
