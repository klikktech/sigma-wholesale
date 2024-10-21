package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.OrderDto;
import com.klikk.sigma.entity.Order;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.mapper.OrderMapper;
import com.klikk.sigma.repository.OrderRepository;
import com.klikk.sigma.repository.UserRepository;
import com.klikk.sigma.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public void saveOrder(OrderDto orderDto) {
        Optional<User> user=userRepository.findById(orderDto.getBuyerId());
        Order newOrder=orderMapper.orderDtoToOrder(orderDto);
        if(user.isEmpty()){
            return;
        }
        newOrder.setBuyer(user.get());
        orderRepository.save(newOrder);
    }
}
