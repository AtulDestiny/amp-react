import type { Schema } from "../resource";

export const getArticleHandler: Schema["Article"]["functionHandler"] = async (
  event,
  context
) => {
  const start = performance.now();
  return {
    content: `Echoing content: ${event.arguments.content}`,
    executionDuration: performance.now() - start,
  };
};
