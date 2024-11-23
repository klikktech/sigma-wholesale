package com.klikk.sigma.service;

import com.klikk.sigma.dto.response.CategoryProductsDto;
import com.klikk.sigma.dto.response.ProductResponseDto;
import com.klikk.sigma.entity.Category;
import com.klikk.sigma.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CategoryService {
    public void saveCategory(Category category);

    Page<CategoryProductsDto> getProductsOfCategory(String name, Pageable pageable);

    Page<CategoryProductsDto> getProductsOfTag(String name, Pageable pageable);
}



