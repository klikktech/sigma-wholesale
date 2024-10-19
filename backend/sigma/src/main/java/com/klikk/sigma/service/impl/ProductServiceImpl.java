package com.klikk.sigma.service.impl;

import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.dto.ProductRequestDto;
import com.klikk.sigma.mapper.ProductMapper;
import com.klikk.sigma.repository.CategoryRepository;
import com.klikk.sigma.repository.ProductRepository;
import com.klikk.sigma.service.ProductService;
import com.klikk.sigma.utils.AttachmentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    public ProductRepository productRepository;

    @Autowired
    public ProductMapper productMapper;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AttachmentServiceImpl attachmentServiceImpl;
    @Override
    public void saveProduct(ProductRequestDto productRequest, MultipartFile displayImage) throws IOException {

        Product newProduct = productMapper.ProductRequestToProduct(productRequest);
        if(displayImage!=null){
            Attachment att = attachmentServiceImpl.saveAttachment(AttachmentType.PRODUCT_ATTACHMENT, displayImage.getBytes());
            newProduct.setDisplayImage(att);
        }
//        for (MultipartFile mpf : images) {
//            Attachment att = attachmentServiceImpl.saveAttachment(AttachmentType.PRODUCT_ATTACHMENT, mpf.getBytes());
//        }
        //        System.out.println(newProduct.getCategory().getName());
        productMapper.ProductToProductDto(productRepository.save(newProduct));
    }
}
