package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.ProductCategoryDto;
import com.klikk.sigma.dto.ProductDto;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.dto.ProductRequestDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public abstract class ProductMapper {
    public abstract ProductDto ProductToProductDto(Product product);

    @Mapping(target = "category",ignore = true)
    @Mapping(target = "id",ignore = true)
    @Mapping(target = "createdAt", qualifiedByName = "convertStringDateToDate")
    @Mapping(target = "modifiedAt", qualifiedByName = "convertStringDateToDate")
    public abstract Product ProductRequestToProduct(ProductRequestDto productRequestDto);

    @Named("convertStringDateToDate")
    public LocalDateTime convertStringDateToDate(String date){
        // write logic for date conversion he
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime dateTime = LocalDateTime.parse(date, formatter);
        return dateTime;
    }
}
