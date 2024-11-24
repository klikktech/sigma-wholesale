package com.klikk.sigma.dto.response;

import com.klikk.sigma.type.AttachmentType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttachmentResponse {
    private AttachmentType type;

    private String imageUrl;
}
