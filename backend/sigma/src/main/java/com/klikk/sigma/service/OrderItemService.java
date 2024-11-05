package com.klikk.sigma.service;

import com.klikk.sigma.entity.Order;

public interface OrderItemService {
    public void addOrderItems(String userEmail, Order order);
}
