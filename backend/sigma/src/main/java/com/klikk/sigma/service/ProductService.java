package com.klikk.sigma.service;

import com.klikk.sigma.dto.ProductDto;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.entity.ProductRequestDto;

public interface ProductService {
    ProductDto saveProduct(ProductRequestDto product);
}
