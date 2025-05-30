import { a } from "@aws-amplify/backend";

export const Author = a
  .model({
    authorId: a.string().required(),
    name: a.string().required(),
    email: a.string().required(),
    articles: a.hasMany("Article", "authorId"),
  })
  .secondaryIndexes((index: any) => [index("authorId"), index("email")])
  .authorization((allow) => [allow.owner()]);
// .authorization((allow: any) => [allow.publicApiKey()]);
