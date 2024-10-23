package com.klikk.sigma.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryRequest {
    private String categoryId;

    private String name;

    private String slug;

    private Long parentCategory;

    private Long count;
}
