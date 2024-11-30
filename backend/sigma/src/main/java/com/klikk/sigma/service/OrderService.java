package com.klikk.sigma.service;

import com.klikk.sigma.dto.OrderDto;
import com.klikk.sigma.dto.request.UpdateUserAdminRequest;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.entity.Order;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface OrderService {
    public SuccessResponse deleteOrder(String orderId) ;

    public Page<OrderDto> findAll(Pageable pageable);

    public OrderDto findOrder(String orderId);

    List<OrderDto> findUserOrders(HttpServletRequest request);

    public void saveOrder(double orderTotal , String customerIp, String paymentMethod, HttpServletRequest request);

    public void saveOrder(OrderDto orderDto,HttpServletRequest request);

    SuccessResponse updateOrderAdmin(String orderId, String orderStatus);
}
