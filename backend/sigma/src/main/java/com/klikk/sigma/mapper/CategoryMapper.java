package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.response.CategoryResponseDto;
import com.klikk.sigma.dto.response.SubCategoryResponse;
import com.klikk.sigma.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
//    @Mapping(source = "parentCategory", target = "parentCategory", qualifiedByName = "mapParentCategory")
    CategoryResponseDto categoryToCategoryResponseDto(Category category);

    SubCategoryResponse categoryToSubCategoryResponseDto(Category category);
//    @Named("mapParentCategory")
//    default CategoryResponseDto mapParentCategory(Category parentCategory) {
//        if (parentCategory == null) {
//            return null;
//        }
//        return categoryToCategoryResponseDto(parentCategory);
//    }
}
