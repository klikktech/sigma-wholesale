package com.klikk.sigma.service;

import com.klikk.sigma.dto.request.ProductRequestDto;
import com.klikk.sigma.dto.response.ProductResponseDto;
import com.klikk.sigma.dto.response.ProductsResponse;
import com.klikk.sigma.dto.response.VariationResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;  // Use Spring's Pageable
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import java.util.List;

public interface ProductService {
    ProductResponseDto saveProduct(ProductRequestDto product, MultipartFile displayImage, List<MultipartFile> images) throws IOException;

    ProductResponseDto getProduct(String details);

    // Return Page instead of List for pagination support
    Page<ProductResponseDto> getAllProducts(Pageable pageable);

    List<ProductResponseDto> getNewArrivals();

    List<ProductsResponse> getAllProductsForAdmin();

    List<VariationResponseDto> getProductVariations(String details);

    String uploadFileToAws(MultipartFile image);

    ProductsResponse getProductForAdmin(String details);
}
