import { a } from "@aws-amplify/backend";

export const Article = a
  .model({
    id: a.string().required(),
    title: a.string().required(),
    content: a.string().required(),
    createdAt: a.datetime(),
    authorId: a.string().required(),
    author: a.belongsTo("Author", "authorId"),
  })
  .secondaryIndexes((index: any) => [index("authorId")])
  .authorization((allow) => [allow.owner()]);
// .authorization((allow: any) => [allow.publicApiKey()]);
