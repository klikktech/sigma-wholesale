package com.klikk.sigma.dto.request;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProductAdminRequest {

    private String name;

    private double maxPrice;

    private double minPrice;

    private double price;

    private boolean isOnSale;

    private String status;

    private String details;

}
