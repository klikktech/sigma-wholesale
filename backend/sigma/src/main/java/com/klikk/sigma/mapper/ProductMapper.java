package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.request.ProductRequestDto;
import com.klikk.sigma.dto.response.AttachmentResponse;
import com.klikk.sigma.dto.response.CategoryProductsDto;
import com.klikk.sigma.dto.response.ProductResponseDto;
import com.klikk.sigma.dto.response.ProductsResponse;
import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class ProductMapper {

    @Mapping(target = "displayImage", ignore = true)
//    @Mapping(target = "images", ignore = true)
    public abstract ProductResponseDto productToProductResponseDto(Product product);

    @Mapping(target = "id",ignore = true)
    @Mapping(target = "createdAt",ignore = true)
    @Mapping(target = "modifiedAt",ignore = true)
    @Mapping(target = "totalSales",ignore = true)
    @Mapping(target = "productType",ignore = true)
    @Mapping(target = "variations",ignore = true)
    public abstract Product productRequestToProduct(ProductRequestDto productRequestDto);

//    @Mapping(source = "displayImage", target = "displayImage", qualifiedByName = "mapDisplayImage")
//    @Mapping(target = "images", ignore = true)
    public abstract ProductsResponse adminAllProductsResponse(Product product);

//    @Mapping(target = "displayImage", ignore = true)
//    @Mapping(target = "images", ignore = true)
    public abstract ProductsResponse adminProductsResponse(Product product);

    public abstract CategoryProductsDto productToCategoryProductsDto(Product product);

    @Named("mapDisplayImage")
    protected AttachmentResponse mapDisplayImage(Attachment displayImage) {
        return displayImage != null ? attachmentMapper.attachmentToAttachmentResponse(displayImage) : null;
    }

    @Autowired
    private AttachmentMapper attachmentMapper;
}
