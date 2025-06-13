import { a } from "@aws-amplify/backend";

export const Author = a.customType({
  id: a.id().required(),
  name: a.string().required(),
  createdAt: a.datetime(),
  updatedAt: a.datetime(),
});
