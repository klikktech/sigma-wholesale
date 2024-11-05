package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.request.CartRequest;
import com.klikk.sigma.dto.request.CartItemRequest;
import com.klikk.sigma.dto.response.CartItemResponseDto;
import com.klikk.sigma.dto.response.CartResponseDto;
import com.klikk.sigma.entity.*;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.mapper.CartItemMapper;
import com.klikk.sigma.mapper.CartMapper;
import com.klikk.sigma.mapper.ProductMapper;
import com.klikk.sigma.mapper.VariationMapper;
import com.klikk.sigma.repository.*;
import com.klikk.sigma.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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

    @Autowired
    private JwtServiceImpl jwtService;

    @Autowired
    private CartItemMapper cartItemMapper;

    @Autowired
    private CartMapper cartMapper;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private CartItemsRepository cartItemsRepository;

    @Autowired
    private VariationMapper variationMapper;

    @Override
    @Transactional
    public void addOrUpdateCart(CartRequest cartRequestDto, String bearerToken) {
        // Find the user by email
        String email = jwtService.extractUsername(bearerToken.split(" ")[1]);
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new NotFoundException("User with email: " + email + " not found.");
        }

        // Find or create the cart for the user
        Cart cart = cartRepository.findByUser(user.get())
                .orElse(Cart.builder()
                        .user(user.get())
                        .quantity(cartRequestDto.getQuantity())
                        .createdAt(LocalDateTime.now())
                        .build());

        // Update the cart's fields
        cart.setUpdatedAt(LocalDateTime.now());
        cart.setPrice(cartRequestDto.getPrice());
        cart.setQuantity(cartRequestDto.getQuantity());

        // Save the cart
        cart = cartRepository.save(cart);

        // Update cart items
        List<CartItemRequest> requestedItems = cartRequestDto.getCartItemsList();
        List<CartItem> existingItems = cartItemRepository.findByCart(cart);

        // Prepare a list for items to remove from the cart
        List<CartItem> itemsToRemove = new ArrayList<>();

        for (CartItem existingItem : existingItems) {
            Optional<CartItemRequest> matchingRequestItem = requestedItems.stream()
                    .filter(reqItem -> reqItem.getVariation().equals(existingItem.getVariation().getDetails()))
                    .findFirst();

            if (matchingRequestItem.isPresent()) {
                // Update quantity if item is found in the request
                existingItem.setQuantity(matchingRequestItem.get().getQuantity());
                existingItem.setAddedAt(LocalDateTime.now());
                cartItemRepository.save(existingItem);

                // Remove from the request list to mark it as processed
                requestedItems.remove(matchingRequestItem.get());
            } else {
                // If not in the request list, mark it for deletion
                itemsToRemove.add(existingItem);
            }
        }

        // Delete items that are no longer in the request
        for (CartItem itemToRemove : itemsToRemove) {
            cartItemRepository.delete(itemToRemove);
        }

        // Add new items that were not in the existing items
        for (CartItemRequest newItemRequest : requestedItems) {
            Variation variation = variationRepository.findByDetails(newItemRequest.getVariation())
                    .orElseThrow(() -> new NotFoundException("Variation not found for details: " + newItemRequest.getVariation()));

            CartItem newCartItem = CartItem.builder()
                    .cart(cart)
                    .variation(variation)
                    .quantity(newItemRequest.getQuantity())
                    .addedAt(LocalDateTime.now())
                    .build();

            cartItemRepository.save(newCartItem);
        }
    }



    @Override
    public CartResponseDto getCart(String bearerToken) {
        Optional<User> user=userRepository.findByEmail(jwtService.extractUsername(bearerToken.split(" ")[1]));
        Optional<Cart> cart=cartRepository.findByUser(user.get());
        CartResponseDto cartResponseDto= cartMapper.cartToCartResponseDto(cart.get());
//        cartResponseDto.setProduct(productMapper.productToProductResponseDto(cart.getProduct()));
         List<CartItemResponseDto> cartItemResponseDtos=cartItemsRepository.findByCart(cart.get()).stream().map(cartItem -> {
             CartItemResponseDto cartItemResponseDto=cartItemMapper.cartItemToCartItemResponseDto(cartItem);
             cartItemResponseDto.setVariation(variationMapper.variationToVariationResponseDto(cartItem.getVariation()));
             return cartItemResponseDto;

        }).toList();
         cartResponseDto.setCartItems(cartItemResponseDtos);
         return cartResponseDto;

    }
}
