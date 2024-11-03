package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Cart;
import com.klikk.sigma.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemsRepository extends JpaRepository<CartItem,String> {
public List<CartItem> findByCart(Cart cart);
}
