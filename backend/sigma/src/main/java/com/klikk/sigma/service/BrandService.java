package com.klikk.sigma.service;

import com.klikk.sigma.dto.response.BrandResponse;
import com.klikk.sigma.entity.Brand;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BrandService {
    public List<Brand> getAllBrands();

    public void addBrand(String name, MultipartFile image);

    public BrandResponse getBrand(String name);

    public void deleteBrand(String name);

    public void updateBrand(String name, MultipartFile image);
}