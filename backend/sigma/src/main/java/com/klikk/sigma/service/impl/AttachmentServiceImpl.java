package com.klikk.sigma.service.impl;

import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.service.AttachmentService;
import com.klikk.sigma.utils.AttachmentType;
import org.springframework.stereotype.Service;

@Service
public class AttachmentServiceImpl implements AttachmentService {
    @Override
    public Attachment saveAttachment(AttachmentType type, byte[] fileContent) {
        return null;
    }
}
