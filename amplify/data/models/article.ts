import { a, defineModel } from "@aws-amplify/backend";

export const Article = defineModel({
  name: "Article",
  fields: (a) => ({
    id: a.id().required(),
    title: a.string().required(),
    content: a.string().required(),
    createdAt: a.datetime(),
    authorId: a.string().required(),
    author: a.belongsTo("Author", "authorId"),
  }),
  indexes: (a) => ({
    byAuthorCreatedAt: {
      fields: [a.field("authorId"), a.field("createdAt")],
    },
  }),
  authorization: (allow) => [allow.publicApiKey()],
});
