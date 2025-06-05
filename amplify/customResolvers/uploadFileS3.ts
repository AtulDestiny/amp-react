import { a } from "@aws-amplify/backend";

export const UploadFileS3 = a.mutation()
  .arguments({
    key: a.string().required(),
    contentType: a.string().required(),
  })
  .returns(
    a.customType({
      url: a.string().required(),
      key: a.string().required(),
    })
  )
  .handler(
    a.handler.function("uploadS3Function")
  );
