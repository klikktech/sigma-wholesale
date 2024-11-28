package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.VariationDto;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.entity.Variation;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.mapper.VariationMapper;
import com.klikk.sigma.repository.ProductRepository;
import com.klikk.sigma.repository.VariationRepository;
import com.klikk.sigma.service.VariationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;


@Service
public class VariationServiceImpl implements VariationService {

    @Autowired
    public VariationRepository variationRepository;

    @Autowired
    public ProductRepository productRepository;

    @Autowired
    public VariationMapper variationMapper;

    @Override
    public Variation saveVariation(VariationDto variationDto,String parentProductDetails) {

        Optional<Product> product=productRepository.findByDetails(parentProductDetails);
        Variation variation=variationMapper.variationDtoToVariation(variationDto);
        variation.setCreatedAt(LocalDateTime.now());
        variation.setDetails(generateUniqueDetails(variationDto.getVariationName()));
        if(product.isEmpty()){
           throw new NotFoundException("Product not found");
        }
        variation.setParent(product.get());
        return variationRepository.save(variation);

    }

    private String generateUniqueDetails(String productName) {
        String baseDetails = productName.toLowerCase().replace(" ", "-");
        String uniqueDetails = baseDetails;
        int counter = 1;
        while (productRepository.existsByDetails(uniqueDetails)) {
            uniqueDetails = baseDetails + "-" + counter;
            counter++;
        }
        return uniqueDetails;
    }
}
