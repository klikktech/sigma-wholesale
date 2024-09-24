package com.klikk.sigma.controller;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.service.ProductService;
import com.klikk.sigma.service.impl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    public ProductService productService;

    @PostMapping("/")
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")

    public ResponseEntity<String> addProduct(@RequestBody Product product){
        try {
            productService.saveProduct(product);
            return ResponseEntity.ok("Product Added Successfully");
        }
        catch (Exception exception){
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
        }

    }
}
