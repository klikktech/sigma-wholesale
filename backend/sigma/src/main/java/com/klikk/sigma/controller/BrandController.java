package com.klikk.sigma.controller;

import com.klikk.sigma.dto.BrandProductDto;
import com.klikk.sigma.dto.BrandRequest;
import com.klikk.sigma.entity.Brand;
import com.klikk.sigma.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/brands")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping()
    public ResponseEntity<List<Brand>> getAllBrands(){
        return ResponseEntity.ok(brandService.getAllBrands());
    }

    @PostMapping
    public ResponseEntity<String> addBrand(@RequestPart String name, @RequestPart(value = "image") MultipartFile image) {
        brandService.addBrand(name,image);
        return ResponseEntity.ok("Brand added successfully!");
    }

    @PostMapping("/link")
    public ResponseEntity<String> addBrandToProduct(@RequestBody BrandProductDto brandProductDto) {
        brandService.addBrandToProduct(brandProductDto);
        return ResponseEntity.ok("Brand added successfully!");
    }

}
