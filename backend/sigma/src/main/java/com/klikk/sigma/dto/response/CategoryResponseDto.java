package com.klikk.sigma.dto.response;

import com.klikk.sigma.entity.Category;
import com.klikk.sigma.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryResponseDto {

    private String name;

    private String slug;

//    private List<Product> products;

    private String type;

//    private CategoryResponseDto parentCategory;
}
