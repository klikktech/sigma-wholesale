package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.request.BrandRequest;
import com.klikk.sigma.dto.response.BrandResponse;
import com.klikk.sigma.entity.Brand;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.mapper.BrandMapper;
import com.klikk.sigma.repository.BrandRepository;
import com.klikk.sigma.repository.ProductRepository;
import com.klikk.sigma.service.AwsService;
import com.klikk.sigma.service.BrandService;
import com.klikk.sigma.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private BrandMapper brandMapper;

    @Autowired
    private AwsService awsService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }


    @Override
    public void addBrand(BrandRequest brandRequest) {
        Brand newBrand=Brand.builder().name(brandRequest.getName()).image(brandRequest.getImage()).build();
        brandRepository.save(newBrand);
    }

    @Override
    public BrandResponse getBrand(String name) {
        Optional<Brand> brand= brandRepository.findByName(name);
        if(brand.isEmpty()){
            throw new NotFoundException("Brand not found");
        }

        return brandMapper.brandToBrandResponse(brand.get());

    }

    @Override
    public void deleteBrand(String name) {


        Optional<Brand> brandToDelete= brandRepository.findByName(name);
        if(brandToDelete.isEmpty()){
            throw new NotFoundException("Delete a brand that exists");
        }
        List<Product> brandProducts=productRepository.findByBrand(brandToDelete.get());
        brandProducts.stream().map(product -> {
            productService.deleteProduct(product.getDetails());
            return null;
        });
        awsService.deleteFileFromS3ByUrl(brandToDelete.get().getImage());
        brandRepository.delete(brandToDelete.get());
    }

    @Override
    public void updateBrand(@RequestBody BrandRequest brandRequest) {
        Optional<Brand> brandToUpdate=brandRepository.findByName(brandRequest.getName());
        if(brandToUpdate.isEmpty()){
            throw new NotFoundException("Brand not found");
        }

        brandToUpdate.get().setName(brandRequest.getName());
        brandToUpdate.get().setImage(brandRequest.getImage());
        brandRepository.save(brandToUpdate.get());
    }
}