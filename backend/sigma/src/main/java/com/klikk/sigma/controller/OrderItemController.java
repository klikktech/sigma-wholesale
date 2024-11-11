package com.klikk.sigma.controller;

import com.klikk.sigma.dto.OrderItemRequest;
import com.klikk.sigma.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orderItems")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;
    @PostMapping()
    public void addOrderItems(@RequestBody OrderItemRequest orderItemRequest){
        orderItemService.addOrderItems(orderItemRequest);
    }
}
