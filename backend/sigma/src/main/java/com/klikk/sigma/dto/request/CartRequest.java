package com.klikk.sigma.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartRequest {

    private double price;

    private Long quantity;

//    private String productDetails;

    private List<CartItemRequest> cartItemsList;
}
