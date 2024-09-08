package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.ProductDto;
import com.klikk.sigma.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public abstract class ProductMapper {
    public abstract ProductDto ProductToProductDto(Product product);
    public abstract Product productDtoToProduct(ProductDto productDto);
}
