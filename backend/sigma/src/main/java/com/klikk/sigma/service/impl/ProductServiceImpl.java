package com.klikk.sigma.service.impl;

import com.klikk.sigma.aws.AwsS3Properties;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.dto.ProductRequestDto;
import com.klikk.sigma.mapper.ProductMapper;
import com.klikk.sigma.repository.CategoryRepository;
import com.klikk.sigma.repository.ProductRepository;
import com.klikk.sigma.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.awscore.exception.AwsServiceException;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import jakarta.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private S3Client s3Client;

    @Autowired
    private AwsS3Properties awsS3Properties;

    @Override
    public void saveProduct(ProductRequestDto productRequest, String displayImage) throws IOException {
        Product newProduct = productMapper.ProductRequestToProduct(productRequest);
        newProduct.setDisplayImage(displayImage);
        productRepository.save(newProduct);
    }

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

    @Transactional
    private void uploadFileToS3Bucket(final String bucketName, final String fileName, final File file) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();

        s3Client.putObject(putObjectRequest, software.amazon.awssdk.core.sync.RequestBody.fromFile(file));
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
}
