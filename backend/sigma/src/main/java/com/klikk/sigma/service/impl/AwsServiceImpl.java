package com.klikk.sigma.service.impl;

import com.klikk.sigma.aws.AwsS3Properties;
import com.klikk.sigma.service.AwsService;
import com.klikk.sigma.type.AttachmentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.awscore.exception.AwsServiceException;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class AwsServiceImpl implements AwsService {

    @Autowired
    private AwsS3Properties awsS3Properties;

    @Autowired
    private S3Client s3Client;

    @Override
    public String uploadFileToAws(MultipartFile image) {
        String fileName = "";
        try {
            final File file = convertMultiPartFileToFile(image);
            fileName = awsS3Properties.getProductImagesPath() + "/" + file.getName();
            uploadFileToS3Bucket(awsS3Properties.getBucketName(), fileName, file);
            file.delete(); // Delete immediately after upload to save space

        } catch (AwsServiceException ex) {
            System.out.println("Error while uploading file: " + ex.getMessage());
        } catch (IOException e) {
            System.out.println("Error converting the multi-part file to file: " + e.getMessage());
        }

        return String.format("https://%s.s3.%s.amazonaws.com/%s", awsS3Properties.getBucketName(), Region.US_EAST_2, fileName);
    }


    private File convertMultiPartFileToFile(MultipartFile image) throws IOException {
        // Create a temporary file in the default temp directory with the same file extension as the uploaded file
        String originalFileName = image.getOriginalFilename();
        String fileExtension = originalFileName != null && originalFileName.contains(".")
                ? originalFileName.substring(originalFileName.lastIndexOf("."))
                : "";

        Path tempFilePath = Files.createTempFile("upload-", fileExtension);
        File file = tempFilePath.toFile();

        try (FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(image.getBytes());
        }
        return file;
    }

    @Transactional
    private void uploadFileToS3Bucket(final String bucketName, final String fileName, final File file) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();

        s3Client.putObject(putObjectRequest, software.amazon.awssdk.core.sync.RequestBody.fromFile(file));
    }

    public void deleteFileFromS3ByUrl(String fileUrl) {
        try {
            // Extract the bucket name and file key from the URL
            String bucketName = awsS3Properties.getBucketName();
            String fileKey = extractFileKeyFromUrl(fileUrl, bucketName);
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileKey)
                    .build();

            // Delete the file from the S3 bucket
            s3Client.deleteObject(deleteObjectRequest);
            System.out.println("File deleted successfully from S3: " + fileUrl);
        } catch (AwsServiceException e) {
            System.out.println("Error while deleting file from AWS S3: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
        }
    }

    private String extractFileKeyFromUrl(String fileUrl, String bucketName) {
        // Replace this with your bucket's specific region
        String region = "us-east-2";
        String bucketUrl = String.format("https://%s.s3.%s.amazonaws.com/", bucketName, region);
        if (fileUrl.startsWith(bucketUrl)) {
            return fileUrl.replace(bucketUrl, "");
        } else {
            throw new IllegalArgumentException("File URL does not match the expected bucket URL format.");
        }
    }

    public AttachmentType determineAttachmentType(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType != null) {
            if (contentType.startsWith("image/")) {
                return AttachmentType.IMAGE;
            } else if (contentType.startsWith("video/")) {
                return AttachmentType.VIDEO;
            }
        }
        throw new IllegalArgumentException("Unsupported file type: " + contentType);
    }
}
