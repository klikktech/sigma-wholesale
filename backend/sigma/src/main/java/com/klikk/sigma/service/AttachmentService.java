package com.klikk.sigma.service;

import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.utils.AttachmentType;

public interface AttachmentService {

    public Attachment saveAttachment(AttachmentType type, byte[] fileContent);
}
