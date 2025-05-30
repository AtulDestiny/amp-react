import { a } from "@aws-amplify/backend";

export const Author = a
  .model({
    authorId: a
      .string()
      .required()
      .authorization((allow) => [
        allow.publicApiKey().to(["read"]),
        allow.authenticated().to(["read"]),
      ]),
    name: a
      .string()
      .required()
      .authorization((allow) => [
        allow.publicApiKey().to(["read"]),
        allow.authenticated().to(["read"]),
      ]),
    email: a
      .string()
      .required()
      .authorization((allow) => [
        allow.publicApiKey().to(["read"]),
        allow.authenticated().to(["read"]),
      ]),
    articles: a.hasMany("Article", "authorId"),
  })
  .secondaryIndexes((index: any) => [index("authorId"), index("email")])
  .authorization((allow) => [
    allow.publicApiKey().to(["read"]),
    allow.authenticated().to(["read"]),
  ]);
// .authorization((allow: any) => [allow.publicApiKey()]);
