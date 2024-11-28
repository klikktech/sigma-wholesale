package com.klikk.sigma.service;

import com.klikk.sigma.dto.VariationDto;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.entity.Variation;

public interface VariationService {
    Variation saveVariation(VariationDto variation, String parentProductDetails);
}
