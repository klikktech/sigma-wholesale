package com.klikk.sigma.service;

import com.klikk.sigma.dto.request.CategoryRequest;
import com.klikk.sigma.dto.response.CategoryProductsDto;
import com.klikk.sigma.dto.response.CategoryResponseDto;
import com.klikk.sigma.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {
    public void saveCategory(CategoryRequest categoryRequest);

    Page<CategoryProductsDto> getProductsOfCategory(String name, Pageable pageable);


    public List<CategoryResponseDto> getAllCategories();

    CategoryResponseDto getCategory(String name);

    List<CategoryResponseDto> getChildCategories(String name);

    List<CategoryResponseDto> searchCategoriesByName(String name);

    Page<CategoryResponseDto> getAllCategoriesWithPagination(Pageable pageable);

    void deleteCategory(String name);
}



