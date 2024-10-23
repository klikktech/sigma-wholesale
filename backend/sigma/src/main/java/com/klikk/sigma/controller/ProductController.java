package com.klikk.sigma.controller;

import com.klikk.sigma.dto.response.ProductResponseDto;
import com.klikk.sigma.dto.response.ProductsResponse;
import com.klikk.sigma.dto.response.VariationResponseDto;
import com.klikk.sigma.entity.ProductRequestDto;
import com.klikk.sigma.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    public ProductService productService;

    @PostMapping()
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public ResponseEntity<String> addProduct(@RequestPart("product") ProductRequestDto productRequest,
                                             @RequestPart(value = "displayImage",required = false) MultipartFile displayImage
    ) {
        try {
            productService.saveProduct(productRequest, displayImage);
            return ResponseEntity.ok("Product Added Successfully");
        } catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping()
    public ResponseEntity<Page<ProductResponseDto>> getAllProducts(Pageable pageable){
        return ResponseEntity.ok().body(productService.getAllProducts(pageable));
    }

    @GetMapping("/{sku}")
    public ResponseEntity<ProductResponseDto> getProduct(@PathVariable String sku){
        return ResponseEntity.ok().body((productService.getProduct(sku)));
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAnyAuthority('admin:read')")
    public ResponseEntity<List<ProductsResponse>> getAllProductsForAdmin() {
        return ResponseEntity.ok(productService.getAllProductsForAdmin());
    }

    @GetMapping({"/{sku}/variations"})
    public ResponseEntity<List<VariationResponseDto>> getVariations(@PathVariable String sku) {
        return ResponseEntity.ok().body(this.productService.getProductVariations(sku));
    }
}
