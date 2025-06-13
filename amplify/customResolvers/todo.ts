import { a } from "@aws-amplify/backend";

export const GetTodo = a
  .query()
  .arguments({
    id: a.id().required(),
  })
  .returns(a.ref("Todo"))
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "TodoTableDataSource",
      entry: "../data/getItem.js",
    })
  );

export const ListTodos = a
  .query()
  .returns(a.ref("Todo").array())
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "TodoTableDataSource",
      entry: "../data/getItem.js",
    })
  );

export const AddTodo = a
  .mutation()
  .arguments({
    id: a.id(),
    content: a.string().required(),
    authorId: a.string().required(),
  })
  .returns(a.ref("Todo"))
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "TodoTableDataSource",
      entry: "../data/getItem.js",
    })
  );

export const UpdateTodo = a
  .mutation()
  .arguments({
    id: a.id().required(),
    content: a.string().required(),
    authorId: a.string().required(),
  })
  .returns(a.ref("Todo"))
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "TodoTableDataSource",
      entry: "../data/getItem.js",
    })
  );

export const DeleteTodo = a
  .mutation()
  .arguments({
    id: a.id().required(),
  })
  .returns(a.ref("Todo"))
  .authorization((allow) => [allow.publicApiKey()])
  .handler(
    a.handler.custom({
      dataSource: "TodoTableDataSource",
      entry: "../data/getItem.js",
    })
  );
