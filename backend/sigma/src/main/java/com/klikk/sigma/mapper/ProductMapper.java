package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.request.ProductRequestDto;
import com.klikk.sigma.dto.response.ProductResponseDto;
import com.klikk.sigma.dto.response.ProductsResponse;
import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Base64;
import java.util.List;

@Mapper(componentModel = "spring")
public abstract class ProductMapper {

    public abstract ProductResponseDto productToProductResponseDto(Product product);

    @Mapping(target = "id",ignore = true)
    @Mapping(target = "createdAt",ignore = true)
    @Mapping(target = "modifiedAt",ignore = true)
    @Mapping(target = "ratingCount",ignore = true)
    @Mapping(target = "averageRating",ignore = true)
    @Mapping(target = "stockQuantity",ignore = true)
    @Mapping(target = "totalSales",ignore = true)
    @Mapping(target = "displayImage", ignore = true)
    @Mapping(target = "images", ignore = true)
    public abstract Product productRequestToProduct(ProductRequestDto productRequestDto);

    @Mapping(source = "maxPrice", target = "price")
    @Mapping(target = "displayImage", ignore = true)
    @Mapping(target = "images", ignore = true)
    public abstract ProductsResponse adminAllProductsResponse(Product product);

    @Mapping(source = "maxPrice", target = "price")
    @Mapping(target = "displayImage", qualifiedByName = "encodeDisplayImage")
    @Mapping(target = "images", qualifiedByName = "encodeImages")
    public abstract ProductsResponse adminProductsResponse(Product product);

    @Named("encodeDisplayImage")
    public String encodeDisplayImage(Attachment displayImage) {
        return Base64.getEncoder().encodeToString(displayImage.getFileContent());
    }

    @Named("encodeImages")
    public List<String> encodeImages(List<Attachment> images) {
        return images.stream()
                .map(attachment -> Base64.getEncoder().encodeToString(attachment.getFileContent()))
                .toList();
    }
}
