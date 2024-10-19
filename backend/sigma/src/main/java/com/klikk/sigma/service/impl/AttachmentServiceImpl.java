package com.klikk.sigma.service.impl;

import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.repository.AttachmentRepository;
import com.klikk.sigma.service.AttachmentService;
import com.klikk.sigma.type.AttachmentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class AttachmentServiceImpl implements AttachmentService {

    @Autowired
    private AttachmentRepository attachmentRepository;
    @Override
    public Attachment saveAttachment(AttachmentType type, byte[] fileContent) {
        Attachment newAtt=new Attachment();
        newAtt.setFileContent(fileContent);
        newAtt.setType(AttachmentType.PRODUCT_ATTACHMENT);
       return attachmentRepository.save(newAtt);
    }
}
