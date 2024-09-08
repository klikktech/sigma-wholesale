package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.ProductDto;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.mapper.ProductMapper;
import com.klikk.sigma.repository.ProductRepository;
import com.klikk.sigma.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    public ProductRepository productRepository;

    @Autowired
    public ProductMapper productMapper;

    @Override
    public ProductDto saveProduct(Product product) {
        Product newProduct=productRepository.save(product);
        return productMapper.ProductToProductDto(newProduct);
    }
}
