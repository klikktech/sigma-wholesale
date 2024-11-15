package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.response.AttachmentResponse;
import com.klikk.sigma.dto.response.CategoryProductsDto;
import com.klikk.sigma.dto.response.ProductResponseDto;
import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.entity.Category;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.mapper.AttachmentMapper;
import com.klikk.sigma.mapper.ProductMapper;
import com.klikk.sigma.repository.AttachmentRepository;
import com.klikk.sigma.repository.CategoryRepository;
import com.klikk.sigma.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AttachmentMapper attachmentMapper;

    @Autowired
    private AttachmentRepository attachmentRepository;

    @Autowired
    private ProductMapper productMapper;

    @Override
    public void saveCategory(Category category) {
        categoryRepository.save(category);
    }

    @Override
    public Page<CategoryProductsDto> getProductsOfCategory(String name, Pageable pageable) {
        Category category=categoryRepository.findBySlugAndType(name,"product_cat");
        List<Product> products=category.getProducts();

        // Calculate the start and end indices for pagination
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), products.size());

        // Get the paginated list
        List<CategoryProductsDto> paginatedProducts = products.subList(start, end).stream()
                .map(product -> {
                    List<Attachment> attachments=attachmentRepository.findByProduct(product);
                    CategoryProductsDto responseDto=productMapper.productToCategoryProductsDto(product);
                    AttachmentResponse primaryImage = attachments.stream()
                            .filter(Attachment::isPrimary)
                            .map(attachment -> {
                                return  attachmentMapper.attachmentToAttachmentResponse(attachment);
                            })
                            .findFirst()
                            .orElse(null);
                    List<AttachmentResponse> nonPrimaryImages = attachments.stream()
                            .filter(attachment -> !attachment.isPrimary())
                            .map(attachment -> {
                                return attachmentMapper.attachmentToAttachmentResponse(attachment);
                            })
                            .toList();
                    responseDto.setImages(nonPrimaryImages);
                    responseDto.setDisplayImage(primaryImage);
                    return responseDto;
                })
                .collect(Collectors.toList());

        return new PageImpl<>(paginatedProducts, pageable, products.size());
    }
}