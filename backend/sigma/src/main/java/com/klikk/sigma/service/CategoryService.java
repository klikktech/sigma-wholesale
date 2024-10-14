package com.klikk.sigma.service;

import com.klikk.sigma.entity.Category;
import com.klikk.sigma.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

public interface CategoryService {
    public void saveCategory(Category category);
}



