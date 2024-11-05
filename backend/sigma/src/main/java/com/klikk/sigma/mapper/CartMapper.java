package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.response.CartResponseDto;
import com.klikk.sigma.entity.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel ="spring")
public interface CartMapper {

    @Mapping(target = "cartItems",ignore = true)
    public CartResponseDto cartToCartResponseDto(Cart cart);
}
