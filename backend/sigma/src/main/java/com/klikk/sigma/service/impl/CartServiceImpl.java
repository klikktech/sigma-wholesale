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
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
        // Extract user email from JWT token
        String email = jwtService.extractUsername(bearerToken.split(" ")[1]);
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new NotFoundException("User with email: " + email + " not found.");
        }

        // Find or create the cart for the user
        Cart cart = cartRepository.findByUser(user.get())
                .orElseGet(() -> cartRepository.save(
                        Cart.builder()
                                .user(user.get())
                                .quantity(cartRequestDto.getQuantity())
                                .createdAt(LocalDateTime.now())
                                .price(cartRequestDto.getPrice())
                                .build()
                ));

        // Update cart metadata
        cart.setUpdatedAt(LocalDateTime.now());
        cart.setPrice(cartRequestDto.getPrice());
        cart.setQuantity(cartRequestDto.getQuantity());

        List<CartItemRequest> requestedItems = cartRequestDto.getCartItemsList();
        List<CartItem> existingItems = cartItemRepository.findByCart(cart);

        Map<String, CartItemRequest> requestItemMap = requestedItems.stream()
                .collect(Collectors.toMap(CartItemRequest::getVariation, item -> item));

        for (CartItem existingItem : existingItems) {
            String variationDetails = existingItem.getVariation().getDetails();

            if (requestItemMap.containsKey(variationDetails)) {
                // Update existing item if it's in the request
                CartItemRequest matchingRequest = requestItemMap.get(variationDetails);
                existingItem.setQuantity(matchingRequest.getQuantity());
                existingItem.setAddedAt(LocalDateTime.now());
                cartItemRepository.save(existingItem);

                // Remove from the request map since it's processed
                requestItemMap.remove(variationDetails);
            }
        }

        // Add new items from the request that are not in the existing cart items
        for (CartItemRequest newItemRequest : requestItemMap.values()) {
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

    @Override
    public void deleteCartItem(String variationToDelete, HttpServletRequest request) {
        Optional<User> user=userRepository.findByEmail(jwtService.extractUsername(request.getHeader("Authorization").split(" ")[1]));
        Optional<Cart> cart=cartRepository.findByUser(user.get());
        Optional<Variation> variation= variationRepository.findByDetails(variationToDelete);
        if(variation.isEmpty()){
            throw new IllegalArgumentException("No variation present");
        }
        CartItem existingItem=cartItemRepository.findByVariation(variation.get());
        Double price= existingItem.getVariation().getPrice();
        Long quant= existingItem.getQuantity();
        cartItemRepository.delete(existingItem);
        cart.get().setQuantity(cart.get().getQuantity()-quant);
        cart.get().setPrice(cart.get().getPrice()-(price*quant));
        cartRepository.save(cart.get());
    }
}
