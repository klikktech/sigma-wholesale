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
    public void addCart(CartRequest cartRequestDto,String bearerToken) {
        // Find the user by email
        String email=jwtService.extractUsername(bearerToken.split(" ")[1]);
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isEmpty()){
            throw new NotFoundException("User with id : " + email + " not found.");
        }
        Optional<Product> product=productRepository.findByDetails(cartRequestDto.getProductDetails());
        Cart cart = Cart.builder()
                .user(user.get())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .product(product.get())
                .price(cartRequestDto.getPrice())
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

    @Override
    public CartResponseDto getCart(String bearerToken) {
        Optional<User> user=userRepository.findByEmail(jwtService.extractUsername(bearerToken.split(" ")[1]));
        Cart cart=cartRepository.findByUser(user.get());
        CartResponseDto cartResponseDto= cartMapper.cartToCartResponseDto(cart);
        cartResponseDto.setProduct(productMapper.productToProductResponseDto(cart.getProduct()));
         List<CartItemResponseDto> cartItemResponseDtos=cartItemsRepository.findByCart(cart).stream().map(cartItem -> {
             CartItemResponseDto cartItemResponseDto=cartItemMapper.cartItemToCartItemResponseDto(cartItem);
             cartItemResponseDto.setVariation(variationMapper.variationToVariationResponseDto(cartItem.getVariation()));
             return cartItemResponseDto;

        }).toList();
         cartResponseDto.setCartItems(cartItemResponseDtos);
         return cartResponseDto;

    }
}
