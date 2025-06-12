import { Context, util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx: Context) {
  const item = {
    id: ctx.args.id ?? util.autoId(), // Generate ID if not provided
    title: ctx.args.title,
    content: ctx.args.content,
    authorId: ctx.args.authorId,
    createdAt: new Date().toISOString(), // optionally set timestamp
  };

  return ddb.put({ item });
}

export function response(ctx: Context) {
  const { error, result } = ctx;
  if (error) {
    return util.appendError(error.message, error.type);
  }
  return result;
}
