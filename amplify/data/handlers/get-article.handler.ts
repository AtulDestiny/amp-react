import { type ClientSchema } from "../resource";

export const handler: ClientSchema["getArticle"]["functionHandler"] = async (
  event,
  context
) => {
  return context.db.Article.get({
    id: event.arguments.id,
  });
};
