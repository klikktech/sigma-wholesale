package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;


public interface OrderRepository extends JpaRepository<Order,Integer> {
    public List<Order> findAll();


    Optional<Order> findByOrderId(Long orderId);
}
