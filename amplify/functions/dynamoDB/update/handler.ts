import { Context, util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx: Context) {
  const { id, ...rest } = ctx.args;
  const values = Object.entries(rest).reduce((obj, [key, value]) => {
    obj[key] = value ?? ddb.operations.remove();
    return obj;
  }, {} as Record<string, unknown>);

  return ddb.update({
    key: { id },
    update: values,
  });
}

export function response(ctx: Context) {
  const { error, result } = ctx;
  if (error) {
    if (!ctx.stash.errors) ctx.stash.errors = [];
    ctx.stash.errors.push(error);
    return util.appendError(error.message, error.type, result);
  }
  return result;
}