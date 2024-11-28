package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.response.CartResponseDto;
import com.klikk.sigma.entity.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel ="spring")
public interface CartMapper {

    @Mapping(target = "cartItems",ignore = true)
    @Mapping(target = "discount",ignore = true)
    @Mapping(target = "tax",ignore = true)
    public CartResponseDto cartToCartResponseDto(Cart cart);
}
