import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { Article } from "./models/article";
import { Author } from "./models/author";
import { Todo } from "./models/todo";
import { GetFileS3 } from "../customResolvers/getFileS3";
import { UploadFileS3 } from "../customResolvers/uploadFileS3";
import { ExecuteFlow } from "../customResolvers/executeFlow";
import { ListFilesS3 } from "../customResolvers/listFilesS3";
import {
  AddArticle,
  GetArticle,
  UpdateArticle,
  DeleteArticle,
  ListArticles,
} from "../customResolvers/article";
import {
  AddAuthor,
  GetAuthor,
  UpdateAuthor,
  DeleteAuthor,
  ListAuthors,
} from "../customResolvers/author";
import {
  AddTodo,
  GetTodo,
  UpdateTodo,
  DeleteTodo,
  ListTodos,
} from "../customResolvers/todo";

const schema = a.schema({
  Article,
  Author,
  Todo,
  GetFileS3,
  UploadFileS3,
  ExecuteFlow,
  ListFilesS3,
  AddArticle,
  GetArticle,
  UpdateArticle,
  DeleteArticle,
  ListArticles,
  AddAuthor,
  GetAuthor,
  UpdateAuthor,
  DeleteAuthor,
  ListAuthors,
  AddTodo,
  GetTodo,
  UpdateTodo,
  DeleteTodo,
  ListTodos,
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
