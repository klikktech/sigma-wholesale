package com.klikk.sigma.service;

import com.klikk.sigma.dto.BrandProductDto;
import com.klikk.sigma.dto.BrandRequest;
import com.klikk.sigma.entity.Brand;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BrandService {
    public List<Brand> getAllBrands();

    void addBrand(String name, MultipartFile image);

    void addBrandToProduct(BrandProductDto brandProductDto);
}
