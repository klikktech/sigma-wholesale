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
        Integer parentId=variationDto.getParentId();
        Product parentProduct=productRepository.getReferenceById(parentId);
        Variation variation=variationMapper.variationDtoToVariation(variationDto);
        variation.setParent(parentProduct);
        variationRepository.save(variation);
    }
}
