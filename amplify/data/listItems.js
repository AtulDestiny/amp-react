import * as ddb from "@aws-appsync/utils/dynamodb";

export function request() {
  return ddb.scan({});
}

export function response(ctx) {
  return ctx.result;
}