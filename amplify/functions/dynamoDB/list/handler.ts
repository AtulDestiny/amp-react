import { Context, util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request() {
  return ddb.scan({});
}

export function response(ctx: Context) {
  const { error, result } = ctx;

  if (error) {
    return util.appendError(error.message, error.type);
  }

  return {
    items: result.items,
    nextToken: result.nextToken,
    scannedCount: result.scannedCount,
  };
}
