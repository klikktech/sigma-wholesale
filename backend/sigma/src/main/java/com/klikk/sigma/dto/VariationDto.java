package com.klikk.sigma.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.klikk.sigma.entity.Product;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
