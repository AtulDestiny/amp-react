import { a } from "@aws-amplify/backend";

export const Author = a.customType({
  authorId: a
    .string()
    .required(),
    // .authorization((allow: any) => [
    //   allow.publicApiKey().to(["create", "read"]),
    //   allow.authenticated().to(["read"]),
    // ]),
  name: a
    .string()
    .required(),
    // .authorization((allow: any) => [
    //   allow.publicApiKey().to(["create", "read"]),
    //   allow.authenticated().to(["read"]),
    // ]),
  email: a
    .string()
    .required(),
    // .authorization((allow: any) => [
    //   allow.publicApiKey().to(["create", "read"]),
    //   allow.authenticated().to(["read"]),
    // ]),
});
