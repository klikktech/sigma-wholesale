package com.klikk.sigma.service;

import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.type.AttachmentType;

public interface AttachmentService {

    public Attachment saveAttachment(AttachmentType type, byte[] fileContent);
}
