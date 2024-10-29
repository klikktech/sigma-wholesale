// CartService.java
package com.klikk.sigma.service;

import com.klikk.sigma.dto.request.CartRequest;

public interface CartService {
    void addCart(CartRequest cartRequestDto);
}
