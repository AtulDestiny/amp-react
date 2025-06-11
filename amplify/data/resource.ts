import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { CustomTable } from "./models/custom-table";
import { AddCustomMethodCustomMutation } from "./mutations/custom-table.mutation";
import { testCustomMethodCustomMutation } from "./mutations/test-table.mutation";
import { Article } from "./models/article";
import { Author } from "./models/author";
import { GetFileS3 } from "../customResolvers/getFileS3";
import { UploadFileS3 } from "../customResolvers/uploadFileS3";
import { ExecuteFlow } from "../customResolvers/executeFlow";
import { ListFilesS3 } from "../customResolvers/listFilesS3";
import {
  GetItem,
  AddItem,
  DeleteItem,
  ListItems,
  UpdateItem,
} from "../customResolvers/dynamoDB";

const schema = a.schema({
  CustomTable,
  AddCustomMethodCustomMutation,
  testCustomMethodCustomMutation,
  Article,
  Author,
  GetFileS3,
  UploadFileS3,
  ExecuteFlow,
  ListFilesS3,
  GetItem,
  AddItem,
  DeleteItem,
  ListItems,
  UpdateItem,
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
