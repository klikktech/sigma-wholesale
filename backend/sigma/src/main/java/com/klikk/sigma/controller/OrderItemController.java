package com.klikk.sigma.controller;

import com.klikk.sigma.dto.response.OrderItemResponseDto;
import com.klikk.sigma.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/orderItems")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @GetMapping("/{orderId}")
    public ResponseEntity<List<OrderItemResponseDto>> getOrderItems(@PathVariable String orderId){
        return ResponseEntity.ok(orderItemService.getOrderItems(orderId));
    }

}
