package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.response.CategoryResponseDto;
import com.klikk.sigma.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    
    CategoryResponseDto categoryToCategoryResponseDto(Category category);
}
