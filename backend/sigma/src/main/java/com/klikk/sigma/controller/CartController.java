package com.klikk.sigma.controller;


import com.klikk.sigma.dto.request.CartItemRequest;
import com.klikk.sigma.dto.request.CartRequest;
import com.klikk.sigma.dto.response.CartItemResponseDto;
import com.klikk.sigma.dto.response.CartResponseDto;
import com.klikk.sigma.entity.Cart;
import com.klikk.sigma.entity.CartItem;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.repository.CartItemsRepository;
import com.klikk.sigma.repository.CartRepository;
import com.klikk.sigma.repository.UserRepository;
import com.klikk.sigma.service.CartService;
import com.klikk.sigma.service.impl.JwtServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private JwtServiceImpl jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemsRepository cartItemsRepository;

    @PostMapping()
    public ResponseEntity<String> addCartItems(@RequestBody CartRequest cartRequest, HttpServletRequest request ){
        cartService.addOrUpdateCart(cartRequest,request.getHeader("Authorization"));
        return ResponseEntity.ok().body("Cart Items added Successfully");
    }

    @GetMapping()
    public ResponseEntity<CartResponseDto> getCartItems(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        return ResponseEntity.ok(cartService.getCart(bearerToken));


//        System.out.println();
    }

    @DeleteMapping("/{variationDetails}")
    public ResponseEntity<String> deleteCartItem(@PathVariable  String variationDetails,HttpServletRequest request){
        try {
            cartService.deleteCartItem(variationDetails,request);
            return ResponseEntity.ok("Cart Item deleted successfully!");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
