package com.klikk.sigma.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartResponseDto {
    private double price;
    private Long quantity;
//    private ProductResponseDto product;
    private List<CartItemResponseDto> cartItems;
}
