package com.klikk.sigma.service;

import com.klikk.sigma.dto.response.OrderItemResponseDto;
import com.klikk.sigma.entity.Order;
import com.klikk.sigma.entity.OrderItem;

import java.util.List;

public interface OrderItemService {
    public void addOrderItems(String userEmail, Order order);

    public List<OrderItemResponseDto> getOrderItems(String orderid);
}
