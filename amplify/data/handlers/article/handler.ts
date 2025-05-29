// import type { Schema } from "../../data/resource";
// import "../../helpers/amplify-init";
// import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
// import { generateClient } from "aws-amplify/api";
// import { TOKEN_SECRET } from "../../data/constants/token-secret.constant";

export const handler = async (event: any, context: any): Promise<any> => {
  return context.db.Article.get({
    id: event.arguments.id,
  });
};
