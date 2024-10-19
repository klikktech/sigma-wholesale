package com.klikk.sigma.mapper;

//import com.klikk.sigma.dto.ProductCategoryDto;
import com.klikk.sigma.dto.ProductDto;
import com.klikk.sigma.dto.ProductRequestDto;
import com.klikk.sigma.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDto ProductToProductDto(Product product);

    @Mapping(target = "category",ignore = true)
    @Mapping(target = "id",ignore = true)
    Product ProductRequestToProduct(ProductRequestDto productRequestDto);
}
