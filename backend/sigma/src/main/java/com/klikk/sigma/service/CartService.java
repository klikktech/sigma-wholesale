// CartService.java
package com.klikk.sigma.service;

import com.klikk.sigma.dto.request.CartItemRequest;
import com.klikk.sigma.dto.request.CartRequest;
import com.klikk.sigma.dto.response.CartItemResponseDto;
import com.klikk.sigma.dto.response.CartResponseDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface CartService {
    void addOrUpdateCart(CartRequest cartRequestDto, String bearerToken);


    CartResponseDto getCart(String bearerToken);

    void deleteCartItem(String variationDetails, HttpServletRequest request);
}
