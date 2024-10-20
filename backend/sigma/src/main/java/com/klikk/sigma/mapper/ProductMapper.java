package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.ProductDto;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.entity.ProductRequestDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDto ProductToProductDto(Product product);

    @Mapping(target = "category",ignore = true)
    @Mapping(target = "id",ignore = true)
    @Mapping(target = "createdAt",ignore = true)
    @Mapping(target = "modifiedAt",ignore = true)
    @Mapping(target = "ratingCount",ignore = true)
    @Mapping(target = "averageRating",ignore = true)
    @Mapping(target = "stockQuantity",ignore = true)
    @Mapping(target = "totalSales",ignore = true)
    Product ProductRequestToProduct(ProductRequestDto productRequestDto);
}
