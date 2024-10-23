package com.klikk.sigma.service.impl;


import com.klikk.sigma.dto.ProductCategoryDto;
import com.klikk.sigma.entity.Category;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.repository.CategoryRepository;
import com.klikk.sigma.repository.ProductRepository;
import com.klikk.sigma.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void addProductCategory(ProductCategoryDto productCategoryDto) {
        Optional<Product> product= productRepository.findByProductId(productCategoryDto.getProductId()) ;
        Optional<Category> category=categoryRepository.findByCategoryId(productCategoryDto.getCategoryId());
        if(product.isPresent() && category.isPresent()){
            if(product.get().getCategories()==null){
                product.get().setCategories(new ArrayList<>());
            }
            product.get().getCategories().add(category.get());
            productRepository.save(product.get());
        }
    }
}
