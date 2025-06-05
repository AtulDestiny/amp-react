import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-1" });

export const handler = async (event: any) => {
  const bucketName = "brand-workload-content-dx0n-eocw-s3-dev";
  const key = event.arguments.key;
  const contentType = event.arguments.contentType;

  const input: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(input);
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

  return {
    url: signedUrl,
    key,
  };
};
