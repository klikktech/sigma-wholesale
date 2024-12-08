package com.klikk.sigma.service;

import com.klikk.sigma.dto.request.BannerAddDto;
import com.klikk.sigma.dto.request.BannerRequest;
import com.klikk.sigma.entity.Banner;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BannerService {

    public List<Banner> getAllBanners();

    public void addBanner(BannerAddDto bannerAddDto, MultipartFile image);

    public Banner getBanner(String id);

    public void deleteBanner(String id);

    public void updateBanner(BannerRequest bannerRequest , MultipartFile image);
}