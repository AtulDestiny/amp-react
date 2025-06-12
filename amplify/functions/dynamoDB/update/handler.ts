import { Context, util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx: Context) {
  const { id, ...rest } = ctx.args;
  const values = Object.entries(rest).reduce<Record<string, unknown>>(
    (obj, [key, value]) => {
      obj[key] = value === null || value === undefined
        ? ddb.operations.remove()
        : value;
      return obj;
    },
    {}
  );

  return ddb.update({
    key: { id },
    update: values,
  });
}

export function response(ctx: Context) {
  const { error, result } = ctx;
  if (error) {
    return util.appendError(error.message, error.type);
  }
  return result;
}
