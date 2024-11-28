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

    private String variationName;

    private String sku;

    private String displayStatus;

    private String stockStatus;

    private int stockQuantity;

    private double price;

    private double salePrice;

}
