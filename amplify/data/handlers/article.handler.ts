import type { Schema } from "../resource";

export const handler: Schema["Article"]["functionHandler"] = async (
  event,
  context
) => {
  return context.db.Article.get({
    id: event.arguments.id,
  });
};
