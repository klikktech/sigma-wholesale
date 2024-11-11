package com.klikk.sigma.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderItemRequest {

    private Long orderId;

    private Long productId;

    private Long variationId;

    private Long quantity;
}
