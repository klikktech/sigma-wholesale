package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Order;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface OrderRepository extends JpaRepository<Order,Integer> {
    public List<Order> findAll();
    Optional<Order> findById(String orderId);

    List<Order> findByBuyer(User user);
}
