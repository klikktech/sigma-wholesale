package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.request.CartItemRequest;
import com.klikk.sigma.entity.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CartItemMapper {
    @Mapping(target = "variation", ignore = true)
    @Mapping(target = "cart", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "addedAt", ignore = true)
    public CartItem CartItemRequestToCartItem(CartItemRequest cartItemRequest);
}
