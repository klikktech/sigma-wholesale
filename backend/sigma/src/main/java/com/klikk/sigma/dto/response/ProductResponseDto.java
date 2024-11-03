package com.klikk.sigma.dto.response;

import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDto {
    private String name;

    private String status;

    private String displayImage;

    private String sku;

    private String details;

    private String price;

    private List<VariationResponseDto> variations;

    private List<Category> categories;
}
