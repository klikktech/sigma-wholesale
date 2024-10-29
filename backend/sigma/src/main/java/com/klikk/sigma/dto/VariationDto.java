package com.klikk.sigma.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VariationDto {

    private Long variationId;

    private String typeInfo;

    private String variationName;

    private String sku;

    private double minPrice;

    private double maxPrice;

    private double price;

    private String details;

    private String displayStatus;

    private String stockStatus;

    private int stockQuantity;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime modifiedAt;

    private Long orderCount;

    private Long parentId;
}
