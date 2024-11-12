package com.klikk.sigma.controller.admin;

import com.klikk.sigma.dto.request.ProductRequestDto;
import com.klikk.sigma.dto.response.ProductsResponse;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/admin/products")
public class ProductAdminController {

    @Autowired
    private ProductService productService;

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
    public ResponseEntity<SuccessResponse> addProduct(@RequestBody() ProductRequestDto productRequest) throws IOException {
        productService.saveProduct(productRequest,productRequest.getDisplayImage(),productRequest.getImages());
        return ResponseEntity.ok(new SuccessResponse(LocalDateTime.now(), "Product Added Successfully"));
    }
}
