package com.klikk.sigma.dto.response;

import com.klikk.sigma.dto.request.ProductRequestDto;
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

    private Long quantity;
}
