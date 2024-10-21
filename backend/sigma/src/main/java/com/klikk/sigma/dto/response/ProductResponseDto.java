package com.klikk.sigma.dto.response;

import com.klikk.sigma.entity.Attachment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDto {
    private String name;

    private String status;

    private Attachment displayImage;

    private String sku;
}
