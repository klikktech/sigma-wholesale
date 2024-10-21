package com.klikk.sigma.service.impl;

import com.klikk.sigma.entity.Category;
import com.klikk.sigma.repository.CategoryRepository;
import com.klikk.sigma.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void saveCategory(Category category) {
        Optional<Category> parentCategory=categoryRepository.findByCategoryId(category.getParentId());
        parentCategory.ifPresent(category::setParent);
        categoryRepository.save(category);
    }
}
