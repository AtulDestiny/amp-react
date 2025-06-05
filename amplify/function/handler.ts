
import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export const handler = async (event : any) => {
  const bucketName = 'brand-workload-content-dx0n-eocw-s3-dev';
  const key = event.arguments.key;

  try {
    const signedUrl = s3.getSignedUrl('getObject', {
      Bucket: bucketName,
      Key: key,
      Expires: 60 * 5, // URL valid for 5 minutes
    });

    return {
      url: signedUrl,
      key: key,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Could not generate pre-signed URL.");
  }
};
