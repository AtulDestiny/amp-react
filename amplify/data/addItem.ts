import { Context, util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx: any) {
  const id = ctx.args.id ?? util.autoId();
  const now = util.time.nowISO8601();

  const item = {
    id,
    name: ctx.args.name,
    __typename: "Author",
    createdAt: now,
    updatedAt: now,
  };

  return ddb.put({ key: { id }, item });
}

export function response(ctx: any) {
  return ctx.result;
}