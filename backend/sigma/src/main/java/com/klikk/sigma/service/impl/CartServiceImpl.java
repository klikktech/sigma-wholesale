package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.request.CartRequest;
import com.klikk.sigma.dto.request.CartItemRequest;
import com.klikk.sigma.entity.*;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.repository.*;
import com.klikk.sigma.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemsRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VariationRepository variationRepository;

    @Override
    @Transactional
    public void addCart(CartRequest cartRequestDto) {
        // Find the user by email
        Optional<User> user = userRepository.findByEmail(cartRequestDto.getEmail());
        if(user.isEmpty()){
            throw new NotFoundException("User with id : " + cartRequestDto.getEmail() + " not found.");
        }
        Cart cart = Cart.builder()
                .user(user.get())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        cart = cartRepository.save(cart);

        // Add items to the cart
        for (CartItemRequest itemDto : cartRequestDto.getCartItemsList()) {
            Variation variation = variationRepository.findByDetails(itemDto.getVariation())
                    .orElseThrow(() -> new RuntimeException("Variation not found"));

            CartItem cartItem = CartItem.builder()
                    .cart(cart)
                    .variation(variation)
                    .quantity(itemDto.getQuantity())
                    .addedAt(LocalDateTime.now())
                    .build();

            cartItemRepository.save(cartItem);
        }
    }
}
