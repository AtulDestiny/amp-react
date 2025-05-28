import { a } from "@aws-amplify/backend";

export const Article = a
  .model({
    id: a.id().required(),
    title: a.string().required(),
    content: a.string().required(),
    createdAt: a.datetime(),
    authorId: a.id().required(),
    author: a.belongsTo("Author", "authorId"),
  })
  // .identifier(["id"])
  .secondaryIndexes((index) => [index("authorId")])
  .authorization((allow: any) => [allow.publicApiKey()]);
