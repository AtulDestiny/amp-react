import { defineFunction } from "@aws-amplify/backend";

export const getS3Function = defineFunction({
  name: "getS3Function",
  entry: "./handler.ts"
});

export const uploadS3Function = defineFunction({
  name: "uploadS3Function",
  entry: "./uploadS3.ts"
});