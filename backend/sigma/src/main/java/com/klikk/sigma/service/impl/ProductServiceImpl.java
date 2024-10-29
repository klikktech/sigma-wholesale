package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.request.ProductRequestDto;
import com.klikk.sigma.dto.response.ProductResponseDto;
import com.klikk.sigma.dto.response.ProductsResponse;
import com.klikk.sigma.dto.response.VariationResponseDto;
import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.mapper.ProductMapper;
import com.klikk.sigma.mapper.VariationMapper;
import com.klikk.sigma.repository.CategoryRepository;
import com.klikk.sigma.repository.ProductRepository;
import com.klikk.sigma.service.AttachmentService;
import com.klikk.sigma.service.ProductService;
import com.klikk.sigma.type.AttachmentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    public ProductRepository productRepository;

    @Autowired
    public ProductMapper productMapper;

    @Autowired
    private AttachmentService attachmentService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private VariationMapper variationMapper;

    @Override
    public void saveProduct(ProductRequestDto productRequest) {
        Product newProduct=productMapper.productRequestToProduct(productRequest);
        newProduct.setDetails(generateUniqueDetails(newProduct));
        newProduct.setCreatedAt(LocalDateTime.now());
        newProduct.setModifiedAt(LocalDateTime.now());
        if (productRequest.getDisplayImage()!=null) {
            byte[] displayImageBytes = Base64.getDecoder().decode(productRequest.getDisplayImage());
            Attachment displayAttachment = attachmentService.saveAttachment(AttachmentType.PRODUCT_ATTACHMENT, displayImageBytes);
            newProduct.setDisplayImage(displayAttachment);
        }
        if (productRequest.getImages()!=null) {
            List<Attachment> attachments = productRequest.getImages().stream()
                    .map(attachment -> attachmentService.saveAttachment(AttachmentType.PRODUCT_ATTACHMENT, Base64.getDecoder().decode(attachment)))
                    .collect(Collectors.toList());
            newProduct.setImages(attachments);
        }
//        Optional<Category> productCategory= categoryRepository.findById(productRequest.getCategory());
//        newProduct.setCategory(productCategory.get());
//        System.out.println(newProduct.getCategory().getName());
        productMapper.productToProductResponseDto(productRepository.save(newProduct));
    }

    @Override
    public ProductResponseDto getProduct(String details) {
        Optional<Product> product=productRepository.findByDetails(details);
        return productMapper.productToProductResponseDto(product.get());
    }

    @Override
    public Page<ProductResponseDto> getAllProducts(Pageable pageable) {
        // Fetch products in a paginated way from the repository
        Page<Product> products = productRepository.findAll(pageable);

        // Map each product entity to a ProductResponseDto
        return products.map(product -> productMapper.productToProductResponseDto(product));
    }


    //    @Transactional(readOnly = true)
    @Override
    public List<ProductsResponse> getAllProductsForAdmin() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .sorted(Comparator.comparing(Product::getCreatedAt).reversed())
                .map(product -> productMapper.adminAllProductsResponse(product))
                .collect(Collectors.toList());
    }

    @Override
    public ProductsResponse getProductForAdmin(String details) {
        Optional<Product> product = productRepository.findByDetails(details);
        if (product.isPresent()) {
            return productMapper.adminProductsResponse(product.get());
        } else {
            throw new NotFoundException("Product not found with details : " + details + ".");
        }
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
