package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.OrderDto;
import com.klikk.sigma.entity.Order;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.mapper.OrderMapper;
import com.klikk.sigma.repository.OrderRepository;
import com.klikk.sigma.repository.UserRepository;
import com.klikk.sigma.service.JwtService;
import com.klikk.sigma.service.OrderItemService;
import com.klikk.sigma.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private  OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private OrderItemService orderItemService;

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> findUserOrders(HttpServletRequest request){
        String userEmail= jwtService.extractUsername(request.getHeader("Authorization").split(" ")[1]);
        Optional<User> user=userRepository.findByEmail(userEmail);
        return user.map(value -> orderRepository.findByBuyer(value)).orElse(null);
    }



    @Override
    public void saveOrder(double orderTotal ,String customerIp, String paymentMethod, HttpServletRequest request) {

        Order order=Order.builder().paymentMethod(paymentMethod).customerIp(customerIp).orderTotal(orderTotal).build();
        String token=request.getHeader("Authorization").split(" ")[1];
        String userEmail=jwtService.extractUsername(token);
        Optional<User> user=userRepository.findByEmail(userEmail);
        if(user.isEmpty()){
            return;
        }
        order.setBuyer(user.get());
        order.setOrderCreatedAt(LocalDateTime.now());
        order.setOrderModifiedAt(LocalDateTime.now());
        orderRepository.save(order);
        orderItemService.addOrderItems(userEmail,order);
    }

    @Override
    public void saveOrder(OrderDto orderDto, HttpServletRequest request) {
        //Implementation Pending
    }
}
