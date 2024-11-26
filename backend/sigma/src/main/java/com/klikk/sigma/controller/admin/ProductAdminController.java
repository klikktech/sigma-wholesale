package com.klikk.sigma.controller.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.klikk.sigma.dto.request.ProductRequestDto;
import com.klikk.sigma.dto.request.UpdateProductAdminRequest;
import com.klikk.sigma.dto.response.ProductsResponse;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/admin/products")
public class ProductAdminController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('admin:read')")
    public ResponseEntity<List<ProductsResponse>> getAllProductsForAdmin() {
        return ResponseEntity.ok(productService.getAllProductsForAdmin());
    }

    @GetMapping("/{details}")
    public ResponseEntity<ProductsResponse> getProduct(@PathVariable String details) {
        return ResponseEntity.ok().body((productService.getProductForAdmin(details)));
    }

    @PostMapping()
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public ResponseEntity<SuccessResponse> addProduct(@RequestPart("product") String productString, @RequestPart(value = "displayImage",required = false)MultipartFile displayImage, @RequestPart(value = "images",required = false) List<MultipartFile> images) throws IOException {
//        System.out.println(productString);
        ProductRequestDto productRequest = objectMapper.readValue(productString, ProductRequestDto.class);
        productService.saveProduct(productRequest,displayImage,images);
        return ResponseEntity.ok(new SuccessResponse(LocalDateTime.now(), "Product Added Successfully"));
    }

    @PutMapping()
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public ResponseEntity<SuccessResponse> updateProduct(@RequestPart("product") String request){
        try{
            UpdateProductAdminRequest updateRequest = objectMapper.readValue(request, UpdateProductAdminRequest.class);
            return ResponseEntity.ok(productService.updateProduct(updateRequest));
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(SuccessResponse.builder().message(e.getMessage()).build());
        }

    }

    @DeleteMapping("/{details}")
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public ResponseEntity<SuccessResponse> deleteProduct(@PathVariable String details){
        return ResponseEntity.ok().body((productService.deleteProduct(details)));
    }

}
