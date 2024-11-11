package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.response.CategoryProductsDto;
import com.klikk.sigma.dto.response.ProductResponseDto;
import com.klikk.sigma.entity.Category;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.mapper.ProductMapper;
import com.klikk.sigma.repository.CategoryRepository;
import com.klikk.sigma.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductMapper productMapper;

    @Override
    public void saveCategory(Category category) {
        categoryRepository.save(category);
    }

    @Override
    public Page<CategoryProductsDto> getProductsOfCategory(String name, Pageable pageable) {
        Category category=categoryRepository.findBySlugAndType(name,"product_cat");
        List<Product> products=category.getProducts();

        // Calculate the start and end indices for pagination
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), products.size());

        // Get the paginated list
        List<CategoryProductsDto> paginatedProducts = products.subList(start, end).stream()
                .map(productMapper::productToCategoryProductsDto)
                .collect(Collectors.toList());

        return new PageImpl<>(paginatedProducts, pageable, products.size());
    }
}