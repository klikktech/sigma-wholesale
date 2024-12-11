package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.response.BrandResponse;
import com.klikk.sigma.entity.Brand;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.mapper.BrandMapper;
import com.klikk.sigma.repository.BrandRepository;
import com.klikk.sigma.service.AwsService;
import com.klikk.sigma.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }


    @Override
    public void addBrand(String name, MultipartFile image) {
        Brand newBrand=Brand.builder().name(name).image(awsService.uploadFileToAws(image)).build();
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
        awsService.deleteFileFromS3ByUrl(brandToDelete.get().getImage());
        brandRepository.delete(brandToDelete.get());
    }

    @Override
    public void updateBrand(String name, MultipartFile image) {
        Optional<Brand> brandToUpdate=brandRepository.findByName(name);
        if(brandToUpdate.isEmpty()){
            throw new NotFoundException("Brand not found");
        }
        awsService.deleteFileFromS3ByUrl(brandToUpdate.get().getImage());
        brandToUpdate.get().setName(name);
        brandToUpdate.get().setImage(awsService.uploadFileToAws(image));
        brandRepository.save(brandToUpdate.get());
    }
}