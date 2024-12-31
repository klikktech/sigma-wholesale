package com.klikk.sigma.service.impl;

import com.klikk.sigma.entity.Address;
import com.klikk.sigma.entity.Checkout;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.repository.CheckoutRepository;
import com.klikk.sigma.repository.UserRepository;
import com.klikk.sigma.service.CheckoutService;
import com.klikk.sigma.service.JwtService;
import com.klikk.sigma.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private AddressServiceImpl addressService;

    @Override
    public void addCheckoutDetails(Checkout checkout, HttpServletRequest request) {
        String token=request.getHeader("Authorization").split(" ")[1];
        String userEmail=jwtService.extractUsername(token);
        User user=userRepository.findByEmail(userEmail).orElseThrow(() -> new NotFoundException("User not found"));
        checkout.setUser(user);
        if(addressService.getAddress(checkout.getBillingAddress()).isEmpty()){
            Address newAddress= addressService.saveAddress(checkout.getBillingAddress(),checkout.getBillingCity(), checkout.getBillingState(), checkout.getPostcode(),user);
            user.getShippingAddress().add(newAddress);
        }
        orderService.saveOrder(checkout.getOrderTotal(),checkout.getCustomerIp(),checkout.getPaymentMethod(),request);
    }
}
