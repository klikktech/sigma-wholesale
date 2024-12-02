package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.response.OrderItemResponseDto;
import com.klikk.sigma.dto.response.VariationResponseDto;
import com.klikk.sigma.entity.*;
import com.klikk.sigma.mapper.ProductMapper;
import com.klikk.sigma.mapper.VariationMapper;
import com.klikk.sigma.repository.*;
import com.klikk.sigma.service.CartService;
import com.klikk.sigma.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    private ProductMapper productMapper;

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
        List<CartItem> cartItems = cartItemsRepository.findByCart(cart.get());
        List<OrderItem> orderItems = cartItems.stream()
                .map(cartItem -> {
                    // Ensure at least one (product or variation) is present
                    if (cartItem.getProduct() == null && cartItem.getVariation() == null) {
                        throw new IllegalArgumentException("Either product or variation must be present in CartItem");
                    }

                    // Build OrderItem using the available product or variation
                    OrderItem orderItem = OrderItem.builder()
                            .order(order)
                            .product(cartItem.getProduct())  // Will be null if product is not present
                            .variation(cartItem.getVariation())  // Will be null if variation is not present
                            .quantity(cartItem.getQuantity())
                            .build();

                    // Save the order item
                    orderItemRepository.save(orderItem);
                    cartItemsRepository.delete(cartItem);
                    return orderItem;
                })
                .toList();
        cartRepository.delete(cart.get());

    }

    @Override
    public List<OrderItemResponseDto> getOrderItems(String orderId) {
        Optional<Order> order= orderRepository.findById(orderId);
        return orderItemRepository.findByOrder(order.get()).stream().map(orderItem -> {
            return OrderItemResponseDto.builder().variation(variationMapper.variationToVariationResponseDto(orderItem.getVariation())).product(productMapper.productToProductResponseDto(orderItem.getProduct())).quantity(orderItem.getQuantity()).build();
        }).toList();
    }
}
