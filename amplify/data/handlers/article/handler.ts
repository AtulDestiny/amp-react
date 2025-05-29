export const handler = async (event: any, context: any): Promise<any> => {
  return context.db.Article.get({
    id: event.arguments.id,
  });
};
