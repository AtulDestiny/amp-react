// amplify/data/models/Article.ts
import { a } from "@aws-amplify/backend";

export const Article = a.model({
  fields: () => ({
    id: a.id().required(),
    title: a.string().required(),
    content: a.string().required(),
    createdAt: a.datetime(),
    authorId: a.string().required(),
    author: a.belongsTo("Author", "authorId"),
  }),
  identifier: {
    name: "byId",
    fields: ["id"],
  },
  indexes: {
    byAuthorCreatedAt: {
      fields: ["authorId", "createdAt"],
    },
  },
  authorization: () => [a.allow.publicApiKey()],
});
