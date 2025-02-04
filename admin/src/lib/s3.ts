import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

// Initialize the S3 client
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Uploads a file to AWS S3 and returns its public URL.
 * @param file - The file to upload.
 * @param keyPrefix - The folder/key prefix inside the bucket.
 * @returns The public URL of the uploaded file.
 */
export async function uploadFileToS3(
  file: File,
  keyPrefix: string
): Promise<string> {
  try {
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Generate a unique filename
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const objectKey = `${keyPrefix}/${fileName}`; // Full path in S3

    console.log("Uploading to S3 with key:", objectKey);

    // Create and send the upload command
    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
      Key: objectKey,
      Body: fileBuffer,
      ContentType: file.type,
    });

    await s3Client.send(command);

    // Construct the public URL of the uploaded file
    return `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${objectKey}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
}
