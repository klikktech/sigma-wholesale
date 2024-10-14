package com.klikk.sigma.controller;

import com.klikk.sigma.dto.ProductCategoryDto;
import com.klikk.sigma.service.ProductCategoryService;
import com.klikk.sigma.service.impl.ProductCategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/productCategories")
public class ProductCategoryController {

    @Autowired
    private ProductCategoryServiceImpl productCategoryServiceImpl;
    @PostMapping("/")
    private ResponseEntity<String> addProductCategory(@RequestBody ProductCategoryDto productCategory){
        productCategoryServiceImpl.addProductCategory(productCategory);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Product Category Added");
    }
}
