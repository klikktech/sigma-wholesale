package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.OrderItemRequest;
import com.klikk.sigma.entity.Order;
import com.klikk.sigma.entity.OrderItem;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.entity.Variation;
import com.klikk.sigma.repository.OrderItemRepository;
import com.klikk.sigma.repository.OrderRepository;
import com.klikk.sigma.repository.ProductRepository;
import com.klikk.sigma.repository.VariationRepository;
import com.klikk.sigma.service.OrderItemService;
import org.aspectj.weaver.ast.Var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private VariationRepository variationRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;
    @Override
    public void addOrderItems(OrderItemRequest orderItemRequest) {
        Optional<Order> order=orderRepository.findByOrderId(orderItemRequest.getOrderId());
        Optional<Product> product=productRepository.findByProductId(orderItemRequest.getProductId());
        Optional<Variation> variation=variationRepository.findByVariationId(orderItemRequest.getVariationId());

        if(order.isPresent() && product.isPresent() && variation.isPresent()){
            OrderItem newOrderItem= OrderItem.builder().variation(variation.get()).product(product.get()).order(order.get()).quantity(orderItemRequest.getQuantity()).build();
            orderItemRepository.save(newOrderItem);
        }
    }
}
