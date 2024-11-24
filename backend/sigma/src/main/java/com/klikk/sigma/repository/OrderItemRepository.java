package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Order;
import com.klikk.sigma.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem,String> {
    public List<OrderItem> findByOrder(Order order);
}
