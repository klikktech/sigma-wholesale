package com.klikk.sigma.service;

import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.type.AttachmentType;

public interface AttachmentService {

    Attachment saveAttachment(AttachmentType attachmentType, String imageUrl, Product newProduct, boolean isPrimary);
}
