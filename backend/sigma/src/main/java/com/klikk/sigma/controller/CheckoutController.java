package com.klikk.sigma.controller;

import com.klikk.sigma.entity.Checkout;
import com.klikk.sigma.service.CheckoutService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/checkout")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;
    @PostMapping("")
    public ResponseEntity<String> checkout(@RequestBody Checkout checkoutDetails, HttpServletRequest request){
        checkoutService.addCheckoutDetails(checkoutDetails,request);
        return ResponseEntity.ok("Billing details added successfully");
    }
}
