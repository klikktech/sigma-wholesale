package com.klikk.sigma.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VariationDto {

    private Long productId;

    private String typeInfo;

    private String variationName;

    private String sku;

    private double minPrice;

    private double maxPrice;

    private String displayStatus;

    private String stockStatus;

    private int stockQuantity;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private int orderCount;

    private int parentId;
}
