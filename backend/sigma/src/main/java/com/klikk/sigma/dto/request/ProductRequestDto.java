package com.klikk.sigma.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductRequestDto {

    private String name;

    private double maxPrice;

    private double minPrice;

    private String sku;

    private String details;

    private boolean isOnSale;

    private String status;

    private String displayStatus;

    private int stockQuantity;

    private int totalSales;

    private String commentStatus;

    private Long productId;


    private String category;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime modifiedAt;

    private int ratingCount;

    private double averageRating;
}
