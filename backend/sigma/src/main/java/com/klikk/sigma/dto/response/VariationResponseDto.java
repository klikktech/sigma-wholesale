package com.klikk.sigma.dto.response;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VariationResponseDto {

    private String variationName;

    private String sku;

    private String displayStatus;

    private String stockStatus;

    private int stockQuantity;

    private double price;

    private double salePrice;
}
