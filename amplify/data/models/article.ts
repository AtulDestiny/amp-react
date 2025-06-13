import { a } from "@aws-amplify/backend";

export const Article = a.customType({
  id: a.id().required(),
  title: a.string().required(),
  content: a.string().required(),
  authorId: a.string().required(),
});

export const ListArticlesResult = a.customType({
  items: a.ref("Article").array(),
  nextToken: a.string() || null,
  scannedCount: a.integer(),
});
