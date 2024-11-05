package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.response.ProductResponseDto;
import com.klikk.sigma.entity.Category;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.mapper.ProductMapper;
import com.klikk.sigma.repository.CategoryRepository;
import com.klikk.sigma.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public List<ProductResponseDto> getProductsOfCategory(String name) {
        Category category=categoryRepository.findFirstByName(name);
        List<Product> products=category.getProducts();
        return products.stream().map(product -> {
            return productMapper.productToProductResponseDto(product);
        }).toList();
    }
}