package com.klikk.sigma.service;

import com.klikk.sigma.dto.request.ProductRequestDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductService {
    void saveProduct(ProductRequestDto product, MultipartFile displayImage) throws IOException;
}
