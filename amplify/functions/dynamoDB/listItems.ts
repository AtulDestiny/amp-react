import { Context, util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request() {
  return ddb.scan({});
}

export function response(ctx: Context) {
  return ctx.result;
}