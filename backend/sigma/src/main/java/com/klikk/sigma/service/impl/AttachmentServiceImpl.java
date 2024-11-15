package com.klikk.sigma.service.impl;

import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.repository.AttachmentRepository;
import com.klikk.sigma.service.AttachmentService;
import com.klikk.sigma.type.AttachmentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttachmentServiceImpl implements AttachmentService {

    @Autowired
    private AttachmentRepository attachmentRepository;
    @Override
    public Attachment saveAttachment(AttachmentType attachmentType, String imageUrl, Product newProduct, boolean isPrimary) {
        Attachment newAttachment= Attachment.builder().imageUrl(imageUrl).type(attachmentType).isPrimary(isPrimary).build();
        newAttachment.setProduct(newProduct);
        return attachmentRepository.save(newAttachment);
    }
}
