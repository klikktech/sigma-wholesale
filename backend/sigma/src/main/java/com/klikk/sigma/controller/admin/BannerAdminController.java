package com.klikk.sigma.controller.admin;

import com.klikk.sigma.dto.request.BannerAddDto;
import com.klikk.sigma.dto.request.BannerRequest;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/admin/banners")
public class BannerAdminController {

    @Autowired
    private BannerService bannerService;

    @PostMapping()
    public ResponseEntity<String> addBanner(@RequestPart("banner") BannerAddDto bannerAddDto, @RequestPart(value = "image",required = false) MultipartFile image) {
        bannerService.addBanner(bannerAddDto,image);
        return ResponseEntity.ok("Banner added successfully!");
    }

    @DeleteMapping("/{id}")
    public SuccessResponse deleteBanner(@PathVariable String id){
        bannerService.deleteBanner(id);
        return new SuccessResponse(LocalDateTime.now(),"Banner deleted successfully!");
    }

    @PutMapping()
    public SuccessResponse updateBanner(@RequestPart("banner") BannerRequest bannerRequest, @RequestPart(value = "image",required = false) MultipartFile image){
        bannerService.updateBanner(bannerRequest,image);
        return new SuccessResponse(LocalDateTime.now(),"Banner updated successfully!");
    }



}
