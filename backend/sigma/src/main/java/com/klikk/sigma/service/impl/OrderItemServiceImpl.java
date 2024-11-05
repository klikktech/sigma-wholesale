package com.klikk.sigma.service.impl;

import com.klikk.sigma.entity.*;
import com.klikk.sigma.repository.CartItemsRepository;
import com.klikk.sigma.repository.CartRepository;
import com.klikk.sigma.repository.OrderItemRepository;
import com.klikk.sigma.repository.UserRepository;
import com.klikk.sigma.service.CartService;
import com.klikk.sigma.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemsRepository cartItemsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public void addOrderItems(String userEmail, Order order) {
        Optional<User> user=userRepository.findByEmail(userEmail);
        if(user.isEmpty()){
            return;
        }
        Optional<Cart> cart=cartRepository.findByUser(user.get());
        if(cart.isEmpty()){
            return;
        }
        List<CartItem> cartItems=cartItemsRepository.findByCart(cart.get());
        List<OrderItem> orderItems= cartItems.stream().map(cartItem -> {
            OrderItem orderItem=OrderItem.builder().order(order).variation(cartItem.getVariation()).quantity(cartItem.getQuantity()).build();
            orderItemRepository.save(orderItem);
            cartItemsRepository.delete(cartItem);
            return orderItem;
        }).toList();

    }
}
