package com.klikk.sigma.controller.admin;

import com.klikk.sigma.dto.request.BrandRequest;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.entity.Brand;
import com.klikk.sigma.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/admin/brands")
public class BrandAdminController {

    @Autowired
    private BrandService brandService;

    @PostMapping()
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public ResponseEntity<String> addBrand(@RequestBody BrandRequest brandRequest) {
        brandService.addBrand(brandRequest);
        return ResponseEntity.ok("Brand added successfully!");
    }

    @DeleteMapping("/{name}")
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put','admin:delete')")
    public SuccessResponse deleteBrand(@PathVariable String name){
        brandService.deleteBrand(name);
        return new SuccessResponse(LocalDateTime.now(),"Brand deleted successfully!");
    }

    @PutMapping()
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public SuccessResponse updateBrand(@RequestBody BrandRequest brandRequest){
        brandService.updateBrand(brandRequest);
        return new SuccessResponse(LocalDateTime.now(),"Brand updated successfully!");
    }



}
