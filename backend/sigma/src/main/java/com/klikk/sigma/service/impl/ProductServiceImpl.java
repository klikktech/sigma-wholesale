package com.klikk.sigma.service.impl;

import com.klikk.sigma.aws.AwsS3Properties;
import com.klikk.sigma.dto.request.ProductRequestDto;
import com.klikk.sigma.dto.request.UpdateProductAdminRequest;
import com.klikk.sigma.dto.response.*;
import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.mapper.AttachmentMapper;
import com.klikk.sigma.mapper.ProductMapper;
import com.klikk.sigma.mapper.VariationMapper;
import com.klikk.sigma.repository.AttachmentRepository;
import com.klikk.sigma.repository.CategoryRepository;
import com.klikk.sigma.repository.ProductRepository;
import com.klikk.sigma.service.AttachmentService;
import com.klikk.sigma.service.ProductService;
import com.klikk.sigma.type.AttachmentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.awscore.exception.AwsServiceException;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    public ProductRepository productRepository;

    @Autowired
    private AttachmentRepository attachmentRepository;

    @Autowired
    private AttachmentMapper attachmentMapper;

    @Autowired
    public ProductMapper productMapper;

    @Autowired
    private AwsS3Properties awsS3Properties;

    @Autowired
    private S3Client s3Client;


    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private VariationMapper variationMapper;

    @Autowired
    private AttachmentService attachmentService;

    @Override
    public ProductResponseDto saveProduct(ProductRequestDto productRequest, MultipartFile displayFile, List<MultipartFile> otherFiles) throws IOException {
        // Map the request DTO to a Product entity
        Product newProduct = productMapper.productRequestToProduct(productRequest);
        newProduct.setCreatedAt(LocalDateTime.now());
        newProduct.setDetails(generateUniqueDetails(newProduct));
        final Product savedProduct = productRepository.save(newProduct);

        if (displayFile != null) {
            String fileUrl = uploadFileToAws(displayFile);
            AttachmentType attachmentType = determineAttachmentType(displayFile);
            // Save the display file as an attachment
            attachmentService.saveAttachment(attachmentType, fileUrl, savedProduct, true);
        }

        for (MultipartFile file : otherFiles) {
            String fileUrl = uploadFileToAws(file);
            AttachmentType attachmentType = determineAttachmentType(file);
            attachmentService.saveAttachment(attachmentType, fileUrl, savedProduct, false);
        }

        return productMapper.productToProductResponseDto(savedProduct);
    }

    private AttachmentType determineAttachmentType(MultipartFile file) {
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



    @Override
    public ProductResponseDto getProduct(String details) {
        Optional<Product> product=productRepository.findByDetails(details);
        return buildProductResponse(product.get());
    }

    @Override
    public Page<ProductResponseDto> getAllProducts(Pageable pageable) {
        // Fetch products in a paginated way from the repository
        Page<Product> products = productRepository.findAll(pageable);

        // Map and sort by status (instock first)
        List<ProductResponseDto> sortedDtos = products
                .stream()
                .map(this::buildProductResponse)
                .sorted(Comparator.comparing(product -> "instock".equalsIgnoreCase(product.getStatus()) ? 0 : 1))
                .toList();

        // Return as a page
        return new PageImpl<>(sortedDtos, pageable, products.getTotalElements());
    }

    public ProductResponseDto buildProductResponse(Product product){
        List<Attachment> attachments=attachmentRepository.findByProduct(product);
        ProductResponseDto responseDto=productMapper.productToProductResponseDto(product);
        AttachmentResponse primaryImage = attachments.stream()
                .filter(Attachment::isPrimary)
                .map(attachment -> {
                    return  attachmentMapper.attachmentToAttachmentResponse(attachment);
                })
                .findFirst()
                .orElse(null);
        List<AttachmentResponse> nonPrimaryImages = attachments.stream()
                .filter(attachment -> !attachment.isPrimary())
                .map(attachment -> {
                    return attachmentMapper.attachmentToAttachmentResponse(attachment);
                })
                .toList();
        responseDto.setImages(nonPrimaryImages);
        responseDto.setDisplayImage(primaryImage);
        return responseDto;
    }

    public ProductsResponse buildAdminProductResponse(Product product){
        List<Attachment> attachments=attachmentRepository.findByProduct(product);
        ProductsResponse responseDto=productMapper.adminAllProductsResponse(product);
        AttachmentResponse primaryImage = attachments.stream()
                .filter(Attachment::isPrimary)
                .map(attachment -> {
                    return  attachmentMapper.attachmentToAttachmentResponse(attachment);
                })
                .findFirst()
                .orElse(null);
        List<AttachmentResponse> nonPrimaryImages = attachments.stream()
                .filter(attachment -> !attachment.isPrimary())
                .map(attachment -> {
                    return attachmentMapper.attachmentToAttachmentResponse(attachment);
                })
                .toList();
        responseDto.setImages(nonPrimaryImages);
        responseDto.setDisplayImage(primaryImage);
        return responseDto;
    }


    @Override
    public List<ProductResponseDto> getNewArrivals() {
        List<Product> products=productRepository.findTop6ByStatusOrderByCreatedAtDesc("instock");
        return products.stream().map(this::buildProductResponse).toList();
    }


    //    @Transactional(readOnly = true)
    @Override
    public List<ProductsResponse> getAllProductsForAdmin() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .sorted(Comparator.comparing(Product::getCreatedAt).reversed())
                .map(this::buildAdminProductResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductsResponse getProductForAdmin(String details) {
        Optional<Product> product = productRepository.findByDetails(details);
        if (product.isPresent()) {
            return buildAdminProductResponse(product.get());
        } else {
            throw new NotFoundException("Product not found with details : " + details + ".");
        }
    }

    @Override
    public Page<ProductResponseDto> getProductsFromSearch(String keyword, Pageable pageable) {
        Page<Product> productsPage = productRepository.findByKeyword(keyword, pageable);
        return productsPage.map(this::buildProductResponse);
    }

    @Override
    public SuccessResponse updateProduct(UpdateProductAdminRequest request) {
        Optional<Product> product=productRepository.findByDetails(request.getDetails());

        if(product.isEmpty()){
            throw new IllegalArgumentException("Product not present");
        }

        // Check and update fields only if provided
        if (request.getName() != null) {
            product.get().setName(request.getName());
        }
        if (request.getMaxPrice() > 0) { // Ensure valid price
            product.get().setMaxPrice(request.getMaxPrice());
        }
        if (request.getMinPrice() > 0) { // Ensure valid price
            product.get().setMinPrice(request.getMinPrice());
        }
        if (request.getPrice() > 0) { // Ensure valid price
            product.get().setPrice(request.getPrice());
        }
        // Check for `isOnSale` explicitly as it's a boolean (default is false)
        product.get().setOnSale(request.isOnSale());

        if (request.getStatus() != null) {
            product.get().setStatus(request.getStatus());
        }
        if (request.getDetails() != null) {
            product.get().setDetails(request.getDetails());
        }

        productRepository.save(product.get());

        return new SuccessResponse(LocalDateTime.now(),"Product updated successfully");
    }


    @Override
    public List<VariationResponseDto> getProductVariations(String details) {
        Optional<Product> product=productRepository.findByDetails(details);
        return product.map(value -> value.getVariations().stream().map(variation -> variationMapper.variationToVariationResponseDto(variation)).toList()).orElseGet(List::of);
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

    private String generateUniqueDetails(Product product) {
        String baseDetails = product.getName().toLowerCase().replace(" ", "-");
        String uniqueDetails = baseDetails;
        int counter = 1;
        while (productRepository.existsByDetails(uniqueDetails)) {
            uniqueDetails = baseDetails + "-" + counter;
            counter++;
        }
        return uniqueDetails;
    }

//    private Attachment saveImage(MultipartFile file) {
//        Attachment attachment = new Attachment();
//        try {
//            attachment.setFileName(file.getOriginalFilename());
//            attachment.setFileType(file.getContentType());
//            attachment.setData(file.getBytes());  // Store image as byte array
//        } catch (IOException e) {
//            throw new RuntimeException("Failed to store image", e);
//        }
//        return attachmentRepository.save(attachment);
//    }
}
