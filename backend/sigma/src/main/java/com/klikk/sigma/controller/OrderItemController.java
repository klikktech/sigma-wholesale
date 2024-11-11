package com.klikk.sigma.controller;

import com.klikk.sigma.entity.OrderItem;
import com.klikk.sigma.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/orderitems")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @GetMapping("/{orderId}")
    public ResponseEntity<List<OrderItem>> getOrderItems(@PathVariable String orderId){
        return ResponseEntity.ok(orderItemService.getOrderItems(orderId));
    }

}
