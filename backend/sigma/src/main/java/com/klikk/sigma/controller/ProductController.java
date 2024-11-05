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
            String imageUrl=productService.uploadFileToAws(displayImage);
            productService.saveProduct(productRequest, imageUrl);
            return ResponseEntity.ok("Product Added Successfully");
        } catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping()
    public ResponseEntity<Page<ProductResponseDto>> getAllProducts(Pageable pageable){
        return ResponseEntity.ok().body(productService.getAllProducts(pageable));
    }

    @GetMapping("/new-arrivals")
    public ResponseEntity<List<ProductResponseDto>> getNewArrivals(){
        return ResponseEntity.ok().body(productService.getNewArrivals());
    }

    @GetMapping("/{details}")
    public ResponseEntity<ProductResponseDto> getProduct(@PathVariable String details){
        return ResponseEntity.ok().body((productService.getProduct(details)));
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAnyAuthority('admin:read')")
    public ResponseEntity<List<ProductsResponse>> getAllProductsForAdmin() {
        return ResponseEntity.ok(productService.getAllProductsForAdmin());
    }

    @GetMapping({"/{details}/variations"})
    public ResponseEntity<List<VariationResponseDto>> getVariations(@PathVariable String details) {
        return ResponseEntity.ok().body(this.productService.getProductVariations(details));
    }
}
