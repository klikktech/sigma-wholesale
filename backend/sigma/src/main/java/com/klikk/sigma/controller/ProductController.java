package com.klikk.sigma.controller;


import com.klikk.sigma.aws.AwsS3Properties;
import com.klikk.sigma.dto.ProductRequestDto;
import com.klikk.sigma.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    public ProductService productService;

    @Autowired
    public AwsS3Properties awsS3Properties;

    @PostMapping("/")
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public ResponseEntity<String> addProduct(@RequestPart("product") ProductRequestDto productRequest,
    @RequestPart(value = "displayImage")MultipartFile displayImage
    ){
        try {
            String imageUrl=productService.uploadFileToAws(displayImage);
            productService.saveProduct(productRequest,imageUrl);
            return ResponseEntity.ok("Product Added Successfully");
        }
        catch (Exception exception){
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
        }

    }
}
