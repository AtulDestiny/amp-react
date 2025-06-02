import { a } from "@aws-amplify/backend";

export const Author = a
  .model({
    authorId: a
      .string()
      .required()
      .authorization((allow: any) => [
        allow.publicApiKey().to(["0"]),
        allow.authenticated().to(["0"]),
      ]),
    name: a
      .string()
      .required()
      .authorization((allow: any) => [
        allow.publicApiKey().to(["create", "read"]),
        allow.authenticated().to([]),
      ]),
    email: a
      .string()
      .required()
      .authorization((allow: any) => [
        allow.publicApiKey().to(["create", "read"]),
        allow.authenticated().to([]),
      ]),
    articles: a.hasMany("Article", "authorId"),
  })
  .secondaryIndexes((index: any) => [index("authorId"), index("email")])
  .authorization((allow: any) => [
    allow.publicApiKey().to(["create", "read"]),
    allow.authenticated().to([]),
  ]);
