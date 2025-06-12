import { Context, util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx: any) {
  return ddb.get({ key: { id: ctx.args.id } });
}

export const response = (ctx: any) => ctx.result;