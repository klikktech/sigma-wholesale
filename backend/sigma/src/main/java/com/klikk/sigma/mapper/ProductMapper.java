package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.ProductDto;
import com.klikk.sigma.entity.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDto ProductToProductDto(Product product);
}
