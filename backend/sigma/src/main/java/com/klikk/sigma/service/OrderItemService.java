package com.klikk.sigma.service;

import com.klikk.sigma.entity.Order;
import com.klikk.sigma.entity.OrderItem;

import java.util.List;

public interface OrderItemService {
    public void addOrderItems(String userEmail, Order order);

    public List<OrderItem> getOrderItems(String orderid);
}
