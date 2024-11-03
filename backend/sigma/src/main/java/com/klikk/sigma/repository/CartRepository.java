package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Cart;
import com.klikk.sigma.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,String> {
    public Cart findByUser(User user);
}
