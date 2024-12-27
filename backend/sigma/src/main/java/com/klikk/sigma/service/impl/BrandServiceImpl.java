package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.BrandProductDto;
import com.klikk.sigma.dto.BrandRequest;
import com.klikk.sigma.entity.Brand;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.repository.BrandRepository;
import com.klikk.sigma.repository.ProductRepository;
import com.klikk.sigma.service.BrandService;
import com.klikk.sigma.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ProductServiceImpl productService;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Override
    public void addBrand(String name, MultipartFile image) {
        Brand newBrand=Brand.builder().name(name).image(productService.uploadFileToAws(image)).build();
        brandRepository.save(newBrand);
    }

    @Override
    public void addBrandToProduct(BrandProductDto brandProductDto) {
        Product productToLink=productRepository.findByProductId(brandProductDto.getProductId()).orElseThrow(()->new RuntimeException("Product not found"));
        productToLink.setBrand(brandRepository.findByName(brandProductDto.getName()));
        productRepository.save(productToLink);
    }
}
