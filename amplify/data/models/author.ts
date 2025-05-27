import { a } from "@aws-amplify/backend";

export const Author = a.model({
  id: a.string().required(),
  name: a.string().required(),
  email: a.string().required(),
  articles: a.hasMany("Article", "authorId"),
  keys: {
    byId: ["id"],
    byEmail: ["email"],
  },
});
// .key("byId", ["id"])
// .key("byEmail", ["email"]);
