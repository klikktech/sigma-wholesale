package com.klikk.sigma.controller.admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.klikk.sigma.dto.request.BannerAddDto;
import com.klikk.sigma.dto.request.BannerRequest;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/admin/banners")
public class BannerAdminController {

    @Autowired
    private BannerService bannerService;

    @Autowired
    private ObjectMapper objectMapper;


    @PostMapping()
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public ResponseEntity<String> addBanner(@RequestPart("banner") String bannerString, @RequestPart(value = "image",required = false) MultipartFile image) throws JsonProcessingException {
        BannerAddDto bannerAddDto = objectMapper.readValue(bannerString, BannerAddDto.class);
        bannerService.addBanner(bannerAddDto,image);
        return ResponseEntity.ok("Banner added successfully!");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put','admin:delete')")
    public SuccessResponse deleteBanner(@PathVariable String id){
        bannerService.deleteBanner(id);
        return new SuccessResponse(LocalDateTime.now(),"Banner deleted successfully!");
    }

    @PutMapping()
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public SuccessResponse updateBanner(@RequestPart("banner") BannerRequest bannerRequest, @RequestPart(value = "image",required = false) MultipartFile image){
        bannerService.updateBanner(bannerRequest,image);
        return new SuccessResponse(LocalDateTime.now(),"Banner updated successfully!");
    }
}
