import { a } from "@aws-amplify/backend";

export const Article = a
  .model({
    id: a
      .string()
      .required()
      .authorization((allow) => [
        allow.publicApiKey().to(["read", "create", "update", "delete"]),
        allow.authenticated().to(["read"]),
      ]),
    title: a
      .string()
      .required()
      .authorization((allow) => [
        allow.publicApiKey().to(["read"]),
        allow.authenticated().to(["read"]),
      ]),
    content: a
      .string()
      .required()
      .authorization((allow) => [
        allow.publicApiKey().to(["read"]),
        allow.authenticated().to(["read"]),
      ]),
    createdAt: a
      .datetime()
      .authorization((allow) => [
        allow.publicApiKey().to(["read"]),
        allow.authenticated().to(["read"]),
      ]),
    authorId: a
      .string()
      .required()
      .authorization((allow) => [
        allow.publicApiKey().to(["read"]),
        allow.authenticated().to(["read"]),
      ]),
    author: a.belongsTo("Author", "authorId"),
  })
  .secondaryIndexes((index: any) => [index("authorId")])
  .authorization((allow) => [
    allow
      .publicApiKey()
      .to([
        "get",
        "list",
        "read",
        "create",
        "update",
        "delete",
        "listen",
        "search",
        "sync",
      ]),
    allow.authenticated().to(["read"]),
  ]);
