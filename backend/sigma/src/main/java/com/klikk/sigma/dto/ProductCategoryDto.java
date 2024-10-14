package com.klikk.sigma.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCategoryDto {

    private Long productId;

    private Long categoryId;
}
