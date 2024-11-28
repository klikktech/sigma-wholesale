package com.klikk.sigma.controller.admin;


import com.klikk.sigma.dto.OrderDto;
import com.klikk.sigma.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/orders")
public class OrderAdminController {

    @Autowired
    private OrderService orderService;

    @PreAuthorize("hasAuthority('admin:read')")
    @GetMapping()
    public List<OrderDto> getAllOrders() {
        return orderService.findAll();
    }
}
