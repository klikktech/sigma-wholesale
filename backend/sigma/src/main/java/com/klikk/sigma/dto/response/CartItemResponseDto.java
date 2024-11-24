package com.klikk.sigma.dto.response;

import com.klikk.sigma.entity.Cart;
import com.klikk.sigma.entity.Variation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemResponseDto {
    private VariationResponseDto variation;
    private Long quantity;
}
