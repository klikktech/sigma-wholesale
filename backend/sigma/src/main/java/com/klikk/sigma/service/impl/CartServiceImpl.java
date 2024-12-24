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

        // Map requested items by a unique identifier (e.g., variation or product details)

        Map<String, CartItemRequest> requestItemMap = requestedItems.stream()
                .collect(Collectors.toMap(
                        item -> item.getVariation() != null ? item.getVariation() : item.getProduct(),
                        item -> item
                ));

        System.out.println(requestItemMap);
        for (CartItem existingItem : existingItems) {
            String variationDetails = existingItem.getVariation() != null
                    ? existingItem.getVariation().getDetails()
                    : existingItem.getProduct().getDetails();

            if (requestItemMap.containsKey(variationDetails)) {
                // Update existing item
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
            Optional<Product> product=Optional.empty();
            Optional<Variation> variation=Optional.empty();
            if(newItemRequest.getProduct()!=null){
                 product = productRepository.findByDetails(newItemRequest.getProduct());
            }
            if(newItemRequest.getVariation()!=null) {
                 variation= variationRepository.findByDetails(newItemRequest.getVariation());
            }
            if (product.isEmpty() && variation.isEmpty()) {
                throw new NotFoundException("Variation or Product not found for details: " + newItemRequest.getVariation());
            }

            CartItem newCartItem = CartItem.builder()
                    .cart(cart)
                    .variation(variation.orElse(null)) // If variation is empty, set it to null
                    .product(product.orElse(null))     // If product is empty, set it to null
                    .quantity(newItemRequest.getQuantity())
                    .addedAt(LocalDateTime.now())
                    .build();

            // Ensure either a product or a variation is present
            if (newCartItem.getVariation() == null && newCartItem.getProduct() == null) {
                throw new IllegalStateException("Either variation or product must be present");
            }

            cartItemRepository.save(newCartItem);
        }
    }

    @Override
    public CartResponseDto getCart(String bearerToken) {
        Optional<User> user=userRepository.findByEmail(jwtService.extractUsername(bearerToken.split(" ")[1]));
        Optional<Cart> cart=cartRepository.findByUser(user.get());
        if(cart.isEmpty()){
            return CartResponseDto.builder().price(0).quantity(0L).cartItems(new ArrayList<>()).build();
        }
        CartResponseDto cartResponseDto= cartMapper.cartToCartResponseDto(cart.get());
         List<CartItemResponseDto> cartItemResponseDtos=cartItemsRepository.findByCart(cart.get()).stream().map(cartItem -> {
             CartItemResponseDto cartItemResponseDto=cartItemMapper.cartItemToCartItemResponseDto(cartItem);
             cartItemResponseDto.setVariation(variationMapper.variationToVariationResponseDto(cartItem.getVariation()));
             cartItemResponseDto.setProduct(productMapper.productToProductResponseDto(cartItem.getProduct()));
             return cartItemResponseDto;

        }).toList();
         cartResponseDto.setCartItems(cartItemResponseDtos);
         return cartResponseDto;

    }

    @Override
    public void deleteCartItem(String variationOrProductToDelete, HttpServletRequest request) {
        Optional<User> user=userRepository.findByEmail(jwtService.extractUsername(request.getHeader("Authorization").split(" ")[1]));
        Optional<Cart> cart=cartRepository.findByUser(user.get());
        Optional<Variation> variation= variationRepository.findByDetails(variationOrProductToDelete);
        Optional<Product> product= productRepository.findByDetails(variationOrProductToDelete);
        if(variation.isEmpty() && product.isEmpty()){
            throw new IllegalArgumentException("No variation or product is present");
        }
        CartItem existingItem;
        if(variation.isPresent()){
            existingItem=cartItemRepository.findByVariation(variation.get());
        }
        else{
            existingItem=cartItemRepository.findByProduct(product.get());
        }

        double price;
        if(variation.isPresent()){
            price= existingItem.getVariation().getPrice();
        }
        else{
            price=existingItem.getProduct().getPrice();
        }

        Long quant= existingItem.getQuantity();
        cartItemRepository.delete(existingItem);
        cart.get().setQuantity(cart.get().getQuantity()-quant);
        cart.get().setPrice(cart.get().getPrice()-(price*quant));
        cartRepository.save(cart.get());
    }
}
