package com.klikk.sigma.service;

import org.springframework.web.multipart.MultipartFile;

public interface AwsService {

    String uploadFileToAws(MultipartFile image);

    public void deleteFileFromS3ByUrl(String fileUrl);
}
