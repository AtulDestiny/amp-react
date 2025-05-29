export const handler = async (
  event: { arguments: { id: string } },
  context: any
) => {
  return context.db.Article.get({
    id: event.arguments.id,
  });
};
