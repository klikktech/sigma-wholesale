package com.klikk.sigma.dto.response;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VariationResponseDto {

    private String typeInfo;

    private String variationName;

    private String sku;

    private double minPrice;

    private double maxPrice;

    private String stockStatus;
}
