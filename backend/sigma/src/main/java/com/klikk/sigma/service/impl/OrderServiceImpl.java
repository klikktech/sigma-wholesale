package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.OrderDto;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.entity.Order;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.mapper.OrderMapper;
import com.klikk.sigma.repository.OrderRepository;
import com.klikk.sigma.repository.UserRepository;
import com.klikk.sigma.service.JwtService;
import com.klikk.sigma.service.OrderItemService;
import com.klikk.sigma.service.OrderService;
import com.klikk.sigma.type.OrderStatus;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public SuccessResponse deleteOrder(String orderId) {
        Optional<Order> order=orderRepository.findById(orderId);
        if(order.isEmpty()){
            throw new NotFoundException("Order not found. Please choose a valid order to delete");
        }
        orderRepository.delete(order.get());

        return new SuccessResponse(LocalDateTime.now(),"Order deleted successfully");
    }

    @Override
    public Page<OrderDto> findAll(Pageable pageable) {
        return orderRepository.findAll(pageable)
                .map(orderMapper::orderToOrderDto); // Map each Order to OrderDto
    }

    @Override
    public OrderDto findOrder(String orderId) {
        Optional<Order> order=orderRepository.findById(orderId);
        if(order.isEmpty()){
            throw new NotFoundException("Order not found, please enter a valid order ID");
        }
        return orderMapper.orderToOrderDto(order.get());
    }


    @Override
    public List<OrderDto> findUserOrders(HttpServletRequest request){
        String userEmail= jwtService.extractUsername(request.getHeader("Authorization").split(" ")[1]);
        User user=userRepository.findByEmail(userEmail).orElseThrow(() -> new NotFoundException("User not found"));
        return  orderRepository.findByBuyer(user).stream().map(order -> {
            return orderMapper.orderToOrderDto(order);
        }).toList();
    }



    @Override
    public void saveOrder(double orderTotal ,String customerIp, String paymentMethod, HttpServletRequest request) {

        Order order=Order.builder().paymentMethod(paymentMethod).customerIp(customerIp).orderTotal(orderTotal).build();
        String token=request.getHeader("Authorization").split(" ")[1];
        String userEmail=jwtService.extractUsername(token);
        User user=userRepository.findByEmail(userEmail).orElseThrow(() -> new NotFoundException("User not found"));

        order.setBuyer(user);
        order.setOrderCreatedAt(LocalDateTime.now());
        order.setOrderModifiedAt(LocalDateTime.now());
        order.setOrderStatus(OrderStatus.PENDING);
        orderRepository.save(order);
        orderItemService.addOrderItems(userEmail,order);
    }


    @Override
    public SuccessResponse updateOrderAdmin(String orderId, String orderStatus) {
        Optional<Order> order=orderRepository.findById(orderId);

        if(order.isEmpty()){
            throw new NotFoundException("Order not found. Please choose a valid order to update");
        }
        OrderStatus newOrderStatus = switch (orderStatus.toLowerCase()) {
            case "cancelled" -> OrderStatus.CANCELLED;
            case "processing" -> OrderStatus.PROCESSING;
            case "completed" -> OrderStatus.COMPLETED;
            default -> OrderStatus.PENDING;
        };

        order.get().setOrderStatus(newOrderStatus);
        orderRepository.save(order.get());

        return new SuccessResponse(LocalDateTime.now(),"Order Updated successfully");
    }
}
