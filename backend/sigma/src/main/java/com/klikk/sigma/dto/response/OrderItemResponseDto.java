package com.klikk.sigma.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItemResponseDto {

    private VariationResponseDto variation;

    private ProductResponseDto product;

    private Long quantity;
}
