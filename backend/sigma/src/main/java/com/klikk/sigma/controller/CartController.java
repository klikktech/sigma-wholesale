package com.klikk.sigma.controller;


import com.klikk.sigma.dto.request.CartItemRequest;
import com.klikk.sigma.dto.request.CartRequest;
import com.klikk.sigma.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    @PostMapping()
    public ResponseEntity<String> addCartItems(@RequestBody CartRequest cartRequest ){
        cartService.addCart(cartRequest);
        return ResponseEntity.ok().body("Cart Items added Successfully");
    }

}
