package com.klikk.sigma.service;

import com.klikk.sigma.dto.OrderDto;
import com.klikk.sigma.entity.Order;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.util.List;


public interface OrderService {
    public List<Order> findAll();

    public void saveOrder(double orderTotal ,String customerIp, String paymentMethod, HttpServletRequest request);

    public void saveOrder(OrderDto orderDto,HttpServletRequest request);
}
