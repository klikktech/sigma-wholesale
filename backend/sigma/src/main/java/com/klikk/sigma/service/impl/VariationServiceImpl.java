package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.VariationDto;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.entity.Variation;
import com.klikk.sigma.mapper.VariationMapper;
import com.klikk.sigma.repository.ProductRepository;
import com.klikk.sigma.repository.VariationRepository;
import com.klikk.sigma.service.VariationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void saveVariation(VariationDto variationDto) {
        Long parentId=variationDto.getParentId();
        Optional<Product> parentProduct=productRepository.findByProductId(parentId);
        Variation variation=variationMapper.variationDtoToVariation(variationDto);
        if(parentProduct.isPresent()){
            variation.setParent(parentProduct.get());
        }
        else{
            return;
        }
        variationRepository.save(variation);
    }
}
