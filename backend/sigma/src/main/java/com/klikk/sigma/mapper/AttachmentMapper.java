package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.response.AttachmentResponse;
import com.klikk.sigma.entity.Attachment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AttachmentMapper {
    public AttachmentResponse attachmentToAttachmentResponse(Attachment attachment);
}
