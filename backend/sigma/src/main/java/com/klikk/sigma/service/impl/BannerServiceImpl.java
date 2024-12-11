package com.klikk.sigma.service.impl;


import com.klikk.sigma.dto.request.BannerAddDto;
import com.klikk.sigma.dto.request.BannerRequest;
import com.klikk.sigma.entity.Banner;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.repository.BannerRepository;
import com.klikk.sigma.service.AwsService;
import com.klikk.sigma.service.BannerService;
import com.klikk.sigma.type.AttachmentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class BannerServiceImpl implements BannerService {

    @Autowired
    private BannerRepository bannerRepository;

    @Autowired
    private AwsService awsService;

    @Override
    public List<Banner> getAllBanners() {
        return bannerRepository.findAll();
    }


    @Override
    public void addBanner(BannerAddDto bannerAddDto, MultipartFile image) {
        AttachmentType type=awsService.determineAttachmentType(image);
        Banner newBanner=Banner.builder().title(bannerAddDto.getTitle()).image(awsService.uploadFileToAws(image)).type(type).description(bannerAddDto.getDescription()).build();
        bannerRepository.save(newBanner);
    }

    @Override
    public Banner getBanner(String id) {
        Optional<Banner> banner= bannerRepository.findById(id);
        if(banner.isEmpty()){
            throw new NotFoundException("Banner not found");
        }

        return banner.get();

    }

    @Override
    public void deleteBanner(String id) {
        Optional<Banner> bannerToDelete= bannerRepository.findById(id);
        if(bannerToDelete.isEmpty()){
            throw new NotFoundException("Delete a banner that exists");
        }
        awsService.deleteFileFromS3ByUrl(bannerToDelete.get().getImage());
        bannerRepository.delete(bannerToDelete.get());
    }

    @Override
    public void updateBanner( BannerRequest bannerRequest, MultipartFile image) {
        Optional<Banner> bannerToUpdate=bannerRepository.findById(bannerRequest.getId());
        if(bannerToUpdate.isEmpty()){
            throw new NotFoundException("Banner not found");
        }
        awsService.deleteFileFromS3ByUrl(bannerToUpdate.get().getImage());
        AttachmentType type= awsService.determineAttachmentType(image);
        bannerToUpdate.get().setType(type);
        bannerToUpdate.get().setImage(awsService.uploadFileToAws(image));
        bannerToUpdate.get().setDescription(bannerRequest.getDescription());
        bannerToUpdate.get().setTitle(bannerRequest.getTitle());
        bannerRepository.save(bannerToUpdate.get());
    }
}