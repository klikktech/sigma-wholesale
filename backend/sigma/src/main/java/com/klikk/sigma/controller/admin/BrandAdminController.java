package com.klikk.sigma.controller.admin;

import com.klikk.sigma.dto.response.SuccessResponse;
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
    public ResponseEntity<String> addBrand(@RequestPart("name") String name, @RequestPart(value = "image",required = false) MultipartFile image) {
        brandService.addBrand(name,image);
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
    public SuccessResponse updateBrand(@RequestPart("name") String name, @RequestPart(value = "image",required = false) MultipartFile image){
        brandService.updateBrand(name,image);
        return new SuccessResponse(LocalDateTime.now(),"Brand updated successfully!");
    }



}
