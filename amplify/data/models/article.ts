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
  // Composite Primary Key
  .identifier(["id"])
  // index: search by title
  .index("byTitle", ["title"])
  // composite index: query by authorId + createdAt
  .index("byAuthorIdCreatedAt", ["authorId", "createdAt"])
  .authorization((allow) => [allow.publicApiKey()]);
