package com.klikk.sigma.controller;

import com.klikk.sigma.dto.response.ProductResponseDto;
import com.klikk.sigma.dto.response.VariationResponseDto;
import com.klikk.sigma.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    public ProductService productService;

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

    @GetMapping("/search/{keyword}")
    public ResponseEntity<Page<ProductResponseDto>> getProductsFromSearch(@PathVariable String keyword, Pageable pageable) {
        return ResponseEntity.ok().body((productService.getProductsFromSearch(keyword, pageable)));
    }

    @GetMapping({"/{details}/variations"})
    public ResponseEntity<List<VariationResponseDto>> getVariations(@PathVariable String details) {
        return ResponseEntity.ok().body(this.productService.getProductVariations(details));
    }

    @GetMapping("/brands/{brand}")
    public ResponseEntity<Page<ProductResponseDto>> getProductsByBrand(@PathVariable String brand, Pageable pageable) {
        return ResponseEntity.ok().body(productService.getProductsByBrand(brand, pageable));
    }
}
