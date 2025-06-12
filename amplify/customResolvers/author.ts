import { a } from "@aws-amplify/backend";
import { addFunction } from "../functions/dynamoDB/add/resource";
import { getFunction } from "../functions/dynamoDB/get/resource";
import { updateFunction } from "../functions/dynamoDB/update/resource";
import { deleteFunction } from "../functions/dynamoDB/delete/resource";
import { listFunction } from "../functions/dynamoDB/list/resource";

export const GetAuthor = a
  .query()
  .arguments({
    authorId: a.string().required(),
  })
  .returns(a.ref("Author"))
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "AuthorTableDataSource",
      entry: "./functions/DynamoDB/get/handler.ts",
    })
  );

export const ListAuthors = a
  .query()
  .returns(a.ref("Author").array())
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "AuthorTableDataSource",
      entry: "./functions/DynamoDB/list/handler.ts",
    })
  );

export const AddAuthor = a
  .mutation()
  .arguments({
    authorId: a.string(),
    name: a.string().required(),
    email: a.string().required(),
  })
  .returns(a.ref("Author"))
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "AuthorTableDataSource",
      entry: "./functions/DynamoDB/add/handler.ts",
    })
  );

export const UpdateAuthor = a
  .mutation()
  .arguments({
    authorId: a.string().required(),
    name: a.string(),
    email: a.string(),
  })
  .returns(a.ref("Author"))
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "AuthorTableDataSource",
      entry: "./functions/DynamoDB/update/handler.ts",
    })
  );

export const DeleteAuthor = a
  .mutation()
  .arguments({
    authorId: a.string().required(),
  })
  .returns(a.ref("Author"))
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "AuthorTableDataSource",
      entry: "./functions/DynamoDB/delete/handler.ts",
    })
  );
