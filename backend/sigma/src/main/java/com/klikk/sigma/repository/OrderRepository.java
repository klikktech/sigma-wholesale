package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface OrderRepository extends JpaRepository<Order,Integer> {
    public List<Order> findAll();


}
