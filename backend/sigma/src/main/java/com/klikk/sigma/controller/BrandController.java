package com.klikk.sigma.controller;


import com.klikk.sigma.dto.response.BrandResponse;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.entity.Brand;
import com.klikk.sigma.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/{name}")
    public ResponseEntity<BrandResponse> getBrand(@PathVariable String name){
        return ResponseEntity.ok(brandService.getBrand(name));
    }

}