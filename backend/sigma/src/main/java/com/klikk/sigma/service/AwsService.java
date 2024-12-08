package com.klikk.sigma.service;

import com.klikk.sigma.type.AttachmentType;
import org.springframework.web.multipart.MultipartFile;

public interface AwsService {

    String uploadFileToAws(MultipartFile image);

    public void deleteFileFromS3ByUrl(String fileUrl);

    public AttachmentType determineAttachmentType(MultipartFile file);
}
