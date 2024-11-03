// CartService.java
package com.klikk.sigma.service;

import com.klikk.sigma.dto.request.CartRequest;
import com.klikk.sigma.dto.response.CartItemResponseDto;
import com.klikk.sigma.dto.response.CartResponseDto;

import java.util.List;

public interface CartService {
    void addCart(CartRequest cartRequestDto, String bearerToken);


    CartResponseDto getCart(String bearerToken);
}
