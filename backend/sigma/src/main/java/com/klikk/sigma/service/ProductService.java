package com.klikk.sigma.service;

import com.klikk.sigma.dto.ProductDto;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.dto.ProductRequestDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductService {
    void saveProduct(ProductRequestDto product, MultipartFile displayImage) throws IOException;
}
