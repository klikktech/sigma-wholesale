package com.klikk.sigma.service;

import com.klikk.sigma.dto.OrderDto;
import com.klikk.sigma.entity.Order;
import org.springframework.stereotype.Service;

import java.util.List;


public interface OrderService {
    public List<Order> findAll();

    public void saveOrder(OrderDto orderDto);
}
