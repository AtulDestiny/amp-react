import { a } from "@aws-amplify/backend";

export const Article = a.customType({
  id: a
    .string()
    .required()
    .authorization((allow: any) => [
      allow.publicApiKey().to(["create", "read"]),
      allow.authenticated().to(["read"]),
    ]),
  title: a
    .string()
    .required()
    .authorization((allow: any) => [
      allow.publicApiKey().to(["create", "read"]),
      allow.authenticated().to(["read"]),
    ]),
  content: a
    .string()
    .required()
    .authorization((allow: any) => [
      allow.publicApiKey().to(["create", "read"]),
      allow.authenticated().to(["read"]),
    ]),
  createdAt: a
    .string()
    .authorization((allow: any) => [
      allow.publicApiKey().to(["create", "read"]),
      allow.authenticated().to(["read"]),
    ]),
  authorId: a
    .string()
    .required()
    .authorization((allow: any) => [
      allow.publicApiKey().to(["create", "read"]),
      allow.authenticated().to(["read"]),
    ]),
});
