package com.klikk.sigma.repository;

import com.klikk.sigma.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemsRepository extends JpaRepository<CartItem,String> {
}
