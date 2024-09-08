package com.klikk.sigma.service;

import com.klikk.sigma.dto.ProductDto;
import com.klikk.sigma.entity.Product;


public interface ProductService {
    public ProductDto saveProduct(Product product);
}
