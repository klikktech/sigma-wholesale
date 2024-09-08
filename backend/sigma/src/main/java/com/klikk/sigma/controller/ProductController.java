package com.klikk.sigma.controller;


import com.klikk.sigma.dto.ProductDto;
import com.klikk.sigma.dto.UserDto;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.service.impl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    public ProductServiceImpl productServiceImpl;

//    @GetMapping
//    public ResponseEntity<ProductDto> getProduct(){
//
//    }

    @PostMapping("/")
    public ResponseEntity<ProductDto> addProduct(@RequestBody Product product){
        try {
            return ResponseEntity.ok(productServiceImpl.saveProduct(product));
        }
        catch (Exception exception){
            return new ResponseEntity(exception.getMessage(), HttpStatus.NOT_FOUND);
        }

    }


}
