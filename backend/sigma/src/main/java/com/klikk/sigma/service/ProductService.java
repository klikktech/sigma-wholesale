package com.klikk.sigma.service;

import com.klikk.sigma.dto.request.ProductRequestDto;
import com.klikk.sigma.dto.response.ProductResponseDto;
import com.klikk.sigma.dto.response.ProductsResponse;
import com.klikk.sigma.dto.response.VariationResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;  // Use Spring's Pageable

import java.util.List;

public interface ProductService {
    void saveProduct(ProductRequestDto product);

    ProductResponseDto getProduct(String details);

    // Return Page instead of List for pagination support
    Page<ProductResponseDto> getAllProducts(Pageable pageable);

    List<VariationResponseDto> getProductVariations(String details);

    List<ProductsResponse> getAllProductsForAdmin();

    ProductsResponse getProductForAdmin(String details);
}
