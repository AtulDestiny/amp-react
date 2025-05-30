import { a } from "@aws-amplify/backend";

export const Article = a
  .model({
    id: a
      .string()
      .required()
      .authorization((allow) => [allow.owner()]),
    title: a
      .string()
      .required()
      .authorization((allow) => [allow.owner()]),
    content: a
      .string()
      .required()
      .authorization((allow) => [allow.owner()]),
    createdAt: a.datetime().authorization((allow) => [allow.owner()]),
    authorId: a
      .string()
      .required()
      .authorization((allow) => [allow.owner()]),
    author: a.belongsTo("Author", "authorId"),
  })
  .secondaryIndexes((index: any) => [index("authorId")])
  .authorization((allow) => [allow.owner()]);
// .authorization((allow: any) => [allow.publicApiKey()]);
