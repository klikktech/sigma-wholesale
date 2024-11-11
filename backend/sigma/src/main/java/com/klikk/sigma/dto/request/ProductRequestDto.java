package com.klikk.sigma.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductRequestDto {

    private String name;

    private double maxPrice;

    private double minPrice;

    private double price;

    private String sku;

    private boolean isOnSale;

    private String status;

    private String displayStatus;

    private int stockQuantity;

    private int totalSales;

    private String commentStatus;

    private String category;

//    private String displayImage;
//
//    private List<String> images;

    private int ratingCount;

    private double averageRating;
}
