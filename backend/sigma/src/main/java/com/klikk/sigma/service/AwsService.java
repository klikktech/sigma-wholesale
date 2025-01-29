package com.klikk.sigma.service;

import com.klikk.sigma.type.AttachmentType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface AwsService {

    String uploadFileToAws(MultipartFile image);

    public void deleteFileFromS3ByUrl(String fileUrl);

    public AttachmentType determineAttachmentType(String file) throws IOException;
}
