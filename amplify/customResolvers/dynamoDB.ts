import { a } from "@aws-amplify/backend";

export const GetItem = a
  .query()
  .arguments({
    id: a.string().required(),
  })
  .returns(a.json())
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "../functions/dynamoDB/getItem.ts",
    })
  );

export const ListItems = a
  .query()
  .returns(a.json())
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "../functions/dynamoDB/listItems.ts",
    })
  );

export const AddItem = a
  .mutation()
  .arguments({
    input: a.json().required(),
  })
  .returns(a.json())
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "../functions/dynamoDB/addItem.ts",
    })
  );

export const UpdateItem = a
  .mutation()
  .arguments({
    input: a.json().required(),
  })
  .returns(a.json())
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "../functions/dynamoDB/updateItem.ts",
    })
  );

export const DeleteItem = a
  .mutation()
  .arguments({
    id: a.string().required(),
  })
  .returns(a.json())
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "ArticleTableDataSource",
      entry: "../functions/dynamoDB/deleteItem.ts",
    })
  );
