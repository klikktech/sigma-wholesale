package com.klikk.sigma.service;

import com.klikk.sigma.dto.response.CategoryProductsDto;
import com.klikk.sigma.dto.response.CategoryResponseDto;
import com.klikk.sigma.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {
    public void saveCategory(Category category);

    Page<CategoryProductsDto> getProductsOfCategory(String name, Pageable pageable);

    Page<CategoryProductsDto> getProductsOfTag(String name, Pageable pageable);

    public List<CategoryResponseDto> getAllCategories();
}



