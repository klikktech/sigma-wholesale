package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.ProductDto;
import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.entity.Category;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.entity.ProductRequestDto;
import com.klikk.sigma.mapper.ProductMapper;
import com.klikk.sigma.repository.CategoryRepository;
import com.klikk.sigma.repository.ProductRepository;
import com.klikk.sigma.service.ProductService;
import com.klikk.sigma.type.AttachmentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    public ProductRepository productRepository;

    @Autowired
    public ProductMapper productMapper;

    @Autowired
    private AttachmentServiceImpl attachmentServiceImpl;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ProductDto saveProduct(ProductRequestDto productRequest, MultipartFile displayImage) throws IOException {
        Product newProduct=productMapper.ProductRequestToProduct(productRequest);
        if(displayImage!=null){
            Attachment att = attachmentServiceImpl.saveAttachment(AttachmentType.PRODUCT_ATTACHMENT, displayImage.getBytes());
            newProduct.setDisplayImage(att);
        }
//        Optional<Category> productCategory= categoryRepository.findById(productRequest.getCategory());
//        newProduct.setCategory(productCategory.get());
//        System.out.println(newProduct.getCategory().getName());
        return productMapper.ProductToProductDto(productRepository.save(newProduct));
    }
}
