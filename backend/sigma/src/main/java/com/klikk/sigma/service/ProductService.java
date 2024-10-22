package com.klikk.sigma.service;

import com.klikk.sigma.dto.ProductDto;
import com.klikk.sigma.dto.response.ProductResponseDto;
import com.klikk.sigma.dto.response.ProductsResponse;
import com.klikk.sigma.entity.ProductRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;  // Use Spring's Pageable
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    ProductResponseDto saveProduct(ProductRequestDto product, MultipartFile displayImage) throws IOException;

    ProductResponseDto getProduct(String sku);

    // Return Page instead of List for pagination support
    Page<ProductResponseDto> getAllProducts(Pageable pageable);

    List<ProductsResponse> getAllProductsForAdmin();
}
