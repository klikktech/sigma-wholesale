package com.klikk.sigma.controller.admin;


import com.klikk.sigma.dto.OrderDto;
import com.klikk.sigma.dto.request.UpdateUserAdminRequest;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.dto.response.UsersResponse;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/admin/orders")
public class OrderAdminController {

    @Autowired
    private OrderService orderService;

    @PreAuthorize("hasAuthority('admin:read')")
    @GetMapping()
    public Page<OrderDto> getAllOrders(Pageable pageable) {
        return orderService.findAll(pageable);
    }


    @GetMapping("/{orderId}")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable String orderId) {
        try {
            var result = orderService.findOrder(orderId.toUpperCase());
            return ResponseEntity.of(Optional.of(result));
        } catch (NotFoundException exception) {
            return new ResponseEntity(exception.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception exception) {
            return new ResponseEntity(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/{orderId}")
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put','admin:delete')")
    public ResponseEntity<SuccessResponse> deleteProduct(@PathVariable String orderId){
        try {
            return ResponseEntity.ok().body((orderService.deleteOrder(orderId)));
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(new SuccessResponse(LocalDateTime.now(),e.getMessage()));
        }

    }

    @PutMapping("/update")
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public ResponseEntity<SuccessResponse> updateOrder(
            @RequestBody Map<String, String> updateOrderRequest) {
        try {
            String orderId = updateOrderRequest.get("orderId");
            String orderStatus = updateOrderRequest.get("orderStatus");
            SuccessResponse response = orderService.updateOrderAdmin(orderId,orderStatus);
            return ResponseEntity.ok(response);
        } catch (NotFoundException | IllegalArgumentException exception) {
            return new ResponseEntity<>(new SuccessResponse(LocalDateTime.now(), exception.getMessage()), HttpStatus.NOT_FOUND);
        }
        catch (Exception exception) {
            return new ResponseEntity<>(new SuccessResponse(LocalDateTime.now(), "Failed to update order"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
