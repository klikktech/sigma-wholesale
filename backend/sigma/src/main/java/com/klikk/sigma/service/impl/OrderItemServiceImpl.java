package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.response.OrderItemResponseDto;
import com.klikk.sigma.dto.response.VariationResponseDto;
import com.klikk.sigma.entity.*;
import com.klikk.sigma.mapper.VariationMapper;
import com.klikk.sigma.repository.*;
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

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private VariationMapper variationMapper;

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
            OrderItem orderItem=OrderItem.builder().order(order).product(cartItem.getProduct()).variation(cartItem.getVariation()).quantity(cartItem.getQuantity()).build();
            orderItemRepository.save(orderItem);
            cartItemsRepository.delete(cartItem);
            return orderItem;
        }).toList();

    }

    @Override
    public List<OrderItemResponseDto> getOrderItems(String orderId) {
        Optional<Order> order= orderRepository.findById(orderId);
        return orderItemRepository.findByOrder(order.get()).stream().map(orderItem -> {
            return OrderItemResponseDto.builder().variation(variationMapper.variationToVariationResponseDto(orderItem.getVariation())).quantity(orderItem.getQuantity()).build();
        }).toList();
    }
}
