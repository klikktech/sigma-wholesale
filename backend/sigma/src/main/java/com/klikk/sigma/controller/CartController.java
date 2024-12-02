package com.klikk.sigma.controller;


import com.klikk.sigma.dto.request.CartRequest;
import com.klikk.sigma.dto.response.CartResponseDto;
import com.klikk.sigma.service.CartService;
import com.klikk.sigma.service.impl.JwtServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping()
    public ResponseEntity<String> addCartItems(@RequestBody CartRequest cartRequest, HttpServletRequest request ){
        cartService.addOrUpdateCart(cartRequest,request.getHeader("Authorization"));
        return ResponseEntity.ok().body("Cart Items added Successfully");
    }

    @GetMapping()
    public ResponseEntity<CartResponseDto> getCartItems(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        return ResponseEntity.ok(cartService.getCart(bearerToken));
    }

    @DeleteMapping("/{variationDetails}")
    public ResponseEntity<String> deleteCartItem(@PathVariable  String variationDetails,HttpServletRequest request){
            cartService.deleteCartItem(variationDetails,request);
            return ResponseEntity.ok("Cart Item deleted successfully!");
    }
}
