package com.klikk.sigma.controller;

import com.klikk.sigma.dto.OrderDto;
import com.klikk.sigma.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/userOrders")
    public List<OrderDto> getUserOrders(HttpServletRequest request){
        return orderService.findUserOrders(request);
    }

//    @PostMapping()
//    public ResponseEntity<String> addOrder(@RequestBody OrderDto orderDto, HttpServletRequest request) {
//        try {
//            orderService.saveOrder(orderDto,request);
//            return ResponseEntity.ok("Order Placed successfully");
//        } catch (Exception exception) {
//            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
}
