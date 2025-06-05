import { defineFunction } from "@aws-amplify/backend";

export const uploadS3Function = defineFunction({
  name: "uploadS3Function",
  entry: "./uploadS3.ts",
});
