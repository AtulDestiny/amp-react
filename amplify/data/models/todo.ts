import { a } from "@aws-amplify/backend";

export const Todo = a.customType({
  id: a.id().required(),
  content: a.string().required(),
  authorId: a.string().required(),
});
