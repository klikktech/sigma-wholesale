package com.klikk.sigma.dto.response;

import com.klikk.sigma.entity.Attachment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDto {
    private String name;

    private String status;

    private Attachment displayImage;

    private String sku;

    private String details;

    private String price;

    private List<VariationResponseDto> variations;
}
