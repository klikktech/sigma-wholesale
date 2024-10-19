package com.klikk.sigma.controller;


import com.klikk.sigma.dto.request.ProductRequestDto;
import com.klikk.sigma.service.impl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RestControllerAdvice
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductServiceImpl productServiceImpl;

    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public ResponseEntity<String> addProduct(
            @RequestPart("product") ProductRequestDto productRequestDto,
            @RequestPart(value = "displayImage", required = false) MultipartFile displayImage
//            @RequestPart(value = "images",required = false) MultipartFile[] images,
//            @RequestPart(value = "imageIds",required = false) String[] imageIds
    ) {

        try {
            productServiceImpl.saveProduct(productRequestDto, displayImage);
            return ResponseEntity.ok("Product Added Successfully");
        } catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
