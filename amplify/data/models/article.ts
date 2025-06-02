import { a } from "@aws-amplify/backend";

export const Article = a
  .model({
    id: a
      .string()
      .required()
      .authorization((allow: any) => [
        allow.publicApiKey().to(["create", "read"]),
        allow.authenticated().to(["create", "read"]),
      ]),
    title: a
      .string()
      .required()
      .authorization((allow: any) => [
        allow.publicApiKey().to(["create", "read"]),
        allow.authenticated().to(["create", "read"]),
      ]),
    content: a
      .string()
      .required()
      .authorization((allow: any) => [
        allow.publicApiKey().to(["create", "read"]),
        allow.authenticated().to(["create", "read"]),
      ]),
    createdAt: a
      .datetime()
      .authorization((allow: any) => [
        allow.publicApiKey().to(["create", "read"]),
        allow.authenticated().to(["create", "read"]),
      ]),
    authorId: a
      .string()
      .required()
      .authorization((allow: any) => [
        allow.publicApiKey().to(["create", "read"]),
        allow.authenticated().to(["create", "read"]),
      ]),
    author: a.belongsTo("Author", "authorId"),
  })
  .secondaryIndexes((index: any) => [index("authorId")])
  .authorization((allow: any) => [
    allow.publicApiKey().to(["create", "read"]),
    allow.authenticated().to(["create", "update", "read"]),
  ]);
