package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.request.ProductRequestDto;
import com.klikk.sigma.dto.request.UpdateProductAdminRequest;
import com.klikk.sigma.dto.response.*;
import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.entity.Brand;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.entity.Variation;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.mapper.AttachmentMapper;
import com.klikk.sigma.mapper.CategoryMapper;
import com.klikk.sigma.mapper.ProductMapper;
import com.klikk.sigma.mapper.VariationMapper;
import com.klikk.sigma.repository.*;
import com.klikk.sigma.service.AttachmentService;
import com.klikk.sigma.service.AwsService;
import com.klikk.sigma.service.ProductService;
import com.klikk.sigma.service.VariationService;
import com.klikk.sigma.type.AttachmentType;
import com.klikk.sigma.type.ProductType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private AwsService awsService;

    @Autowired
    private AttachmentRepository attachmentRepository;

    @Autowired
    private VariationRepository variationRepository;

    @Autowired
    private VariationMapper variationMapper;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private AttachmentService attachmentService;

    @Autowired
    private VariationService variationService;

    @Autowired
    private AttachmentMapper attachmentMapper;

    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    public ProductResponseDto saveProduct(ProductRequestDto productRequest, MultipartFile displayFile, List<MultipartFile> otherFiles) throws IOException {
        // Map the request DTO to a Product entity
        Product newProduct = productMapper.productRequestToProduct(productRequest);
        newProduct.setCreatedAt(LocalDateTime.now());
        newProduct.setDetails(generateUniqueDetails(newProduct));
        if(productRequest.getCategories()==null){
            newProduct.setCategories(new ArrayList<>());
        }
        else{
            newProduct.setCategories(productRequest.getCategories().stream().map(category -> categoryRepository.findBySlugAndType(category,"product_cat")).toList());
        }
        if (brandRepository.findByName(productRequest.getBrand()).isPresent()) {
            newProduct.setBrand(brandRepository.findByName(productRequest.getBrand()).get());
        }
        else {
            newProduct.setBrand(null);
        }

        ProductType newProductType= productRequest.getProductType().toLowerCase().equals("simple")?ProductType.SIMPLE:ProductType.VARIABLE;
        newProduct.setProductType(newProductType);
        final Product savedProduct = productRepository.save(newProduct);

        if (displayFile != null) {
            String fileUrl = awsService.uploadFileToAws(displayFile);
            AttachmentType attachmentType = awsService.determineAttachmentType(displayFile);
            // Save the display file as an attachment
            attachmentService.saveAttachment(attachmentType, fileUrl, savedProduct, true);
        }

        for (MultipartFile file : otherFiles) {
            String fileUrl = awsService.uploadFileToAws(file);
            AttachmentType attachmentType = awsService.determineAttachmentType(file);
            attachmentService.saveAttachment(attachmentType, fileUrl, savedProduct, false);
        }

        List<Variation> savedVariations = productRequest.getVariations().stream()
                .map(variation -> variationService.saveVariation(variation, savedProduct.getDetails()))
                .toList();



        return productMapper.productToProductResponseDto(savedProduct);
    }



    @Override
    public ProductResponseDto getProduct(String details) {
        Optional<Product> product=productRepository.findByDetails(details);
        return buildProductResponse(product.get());
    }

    @Override
    public Page<ProductResponseDto> getAllProducts(Pageable pageable) {
        // Fetch products in a paginated way from the repository
        Page<Product> products = productRepository.findAllByOrderByCreatedAtDesc(pageable);

        List<ProductResponseDto> sortedDtos = products
                .stream()
                .map(this::buildProductResponse) // Map to DTO
                .sorted(Comparator.comparing(dto -> "instock".equalsIgnoreCase(dto.getStatus()) ? 0 : 1))
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
        responseDto.setCategories(product.getCategories().stream().map(category -> categoryMapper.categoryToCategoryResponseDto(category)).toList());
        if(product.getBrand()==null){
            responseDto.setBrand("No brand");
        }
        else{
            responseDto.setBrand(product.getBrand().getName());
        }

        return responseDto;
    }

    @Override
    public List<ProductResponseDto> getNewArrivals() {
        List<Product> products=productRepository.findTop6ByStatusOrderByCreatedAtDesc("instock");
        return products.stream().map(this::buildProductResponse).toList();
    }


    //    @Transactional(readOnly = true)
    @Override
    public Page<ProductsResponse> getAllProductsForAdmin(Pageable pageable) {
        // Fetch products in a paginated way
        Page<Product> productsPage = productRepository.findAllByOrderByCreatedAtDesc(pageable);

        // Map each product to ProductsResponse
        List<ProductsResponse> productsResponses = productsPage.getContent()
                .stream()
                .map(this::buildAdminProductResponse)
                .collect(Collectors.toList());

        // Return as a paginated response
        return new PageImpl<>(productsResponses, pageable, productsPage.getTotalElements());
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
    public SuccessResponse updateProduct(UpdateProductAdminRequest request,MultipartFile displayImage, List<MultipartFile> otherFiles) {
        Optional<Product> product=productRepository.findByDetails(request.getDetails());

        if(product.isEmpty()){
            throw new IllegalArgumentException("Product not present");
        }

        List<Attachment> attachments=attachmentRepository.findByProduct(product.get());

        attachments.forEach(attachment -> {
            awsService.deleteFileFromS3ByUrl(attachment.getImageUrl());
            attachmentRepository.delete(attachment);
        });

        // Check and update fields only if provided
        if (request.getName() != null) {
            product.get().setName(request.getName());
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

        Product updatedProduct=productRepository.save(product.get());


        if (displayImage != null) {
            String fileUrl = awsService.uploadFileToAws(displayImage);
            AttachmentType attachmentType = awsService.determineAttachmentType(displayImage);
            // Save the display file as an attachment
            attachmentService.saveAttachment(attachmentType, fileUrl, updatedProduct, true);
        }

        for (MultipartFile file : otherFiles) {
            String fileUrl = awsService.uploadFileToAws(file);
            AttachmentType attachmentType = awsService.determineAttachmentType(file);
            attachmentService.saveAttachment(attachmentType, fileUrl, updatedProduct, false);
        }

        return new SuccessResponse(LocalDateTime.now(),"Product updated successfully");
    }


    @Override
    public SuccessResponse deleteProduct(String details) {

        Optional<Product> product=productRepository.findByDetails(details);
        if(product.isEmpty()){
            throw new NotFoundException("Product not found or already deleted");
        }
        Optional<List<Variation>> variations=variationRepository.findByParent(product.get());
        variations.ifPresent(variationList -> variationList.forEach(variation -> {
            variationRepository.delete(variation);
        }));

        List<Attachment> attachments=attachmentRepository.findByProduct(product.get());
        attachments.forEach(attachment -> {
            awsService.deleteFileFromS3ByUrl(attachment.getImageUrl());
            attachmentRepository.delete(attachment);
        });

        productRepository.delete(product.get());
        return new SuccessResponse(LocalDateTime.now(),"Product deleted successfully");
    }

    @Override
    public Page<ProductResponseDto> getProductsByBrand(String brand, Pageable pageable) {
        Brand queryBrand=brandRepository.findByName(brand).orElseThrow(() -> new NotFoundException("Brand not found"));
        Page<Product> products = productRepository.findByBrand(queryBrand, pageable);
        return products.map(this::buildProductResponse);
    }


    @Override
    public List<VariationResponseDto> getProductVariations(String details) {
        Optional<Product> product=productRepository.findByDetails(details);
        return product.map(value -> value.getVariations().stream().map(variation -> variationMapper.variationToVariationResponseDto(variation)).toList()).orElseGet(List::of);
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

}
