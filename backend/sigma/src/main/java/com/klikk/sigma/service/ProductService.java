package com.klikk.sigma.service;

import com.klikk.sigma.dto.request.ProductRequestDto;
import com.klikk.sigma.dto.request.UpdateProductAdminRequest;
import com.klikk.sigma.dto.response.ProductResponseDto;
import com.klikk.sigma.dto.response.ProductsResponse;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.dto.response.VariationResponseDto;
import com.klikk.sigma.type.AttachmentType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    ProductResponseDto saveProduct(ProductRequestDto product, MultipartFile displayImage, List<MultipartFile> images) throws IOException;

    ProductResponseDto getProduct(String details);

    // Return Page instead of List for pagination support
    Page<ProductResponseDto> getAllProducts(Pageable pageable);

    List<ProductResponseDto> getNewArrivals();

    Page<ProductsResponse> getAllProductsForAdmin(Pageable pageable);

    List<VariationResponseDto> getProductVariations(String details);

    ProductsResponse getProductForAdmin(String details);

    Page<ProductResponseDto> getProductsFromSearch(String keyword, Pageable pageable);

    SuccessResponse updateProduct(UpdateProductAdminRequest request, MultipartFile displayImage, List<MultipartFile> otherFiles);

    SuccessResponse deleteProduct(String details);

    Page<ProductResponseDto> getProductsByBrand(String brand, Pageable pageable);
}
