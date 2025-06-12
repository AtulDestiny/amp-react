import { a } from "@aws-amplify/backend";
import { Author } from "../data/models/author";

export const GetAuthor = a
  .query()
  .arguments({
    authorId: a.string().required(),
  })
  .returns(Author)
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "AuthorTableDataSource",
      entry: "../functions/dynamoDB/get/handler.ts",
    })
  );

export const ListAuthors = a
  .query()
  .returns(Author)
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "AuthorTableDataSource",
      entry: "../functions/dynamoDB/list/handler.ts",
    })
  );

export const AddAuthor = a
  .mutation()
  .arguments({
    authorId: a.string(),
    name: a.string().required(),
    email: a.string().required(),
  })
  .returns(Author)
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "AuthorTableDataSource",
      entry: "../functions/dynamoDB/add/handler.ts",
    })
  );

export const UpdateAuthor = a
  .mutation()
  .arguments({
    authorId: a.string().required(),
    name: a.string(),
    email: a.string(),
  })
  .returns(Author)
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "AuthorTableDataSource",
      entry: "../functions/dynamoDB/update/handler.ts",
    })
  );

export const DeleteAuthor = a
  .mutation()
  .arguments({
    authorId: a.string().required(),
  })
  .returns(Author)
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "AuthorTableDataSource",
      entry: "../functions/dynamoDB/delete/handler.ts",
    })
  );
