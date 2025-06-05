import {
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-1" }); // or your region

export const handler = async (event: any) => {
  const bucketName = "brand-workload-content-dx0n-eocw-s3-dev";
  const key = event.arguments.key;

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });

    return {
      url: signedUrl,
      key,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Could not generate pre-signed URL.");
  }
};
