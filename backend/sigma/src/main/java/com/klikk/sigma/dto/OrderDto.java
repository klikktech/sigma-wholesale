package com.klikk.sigma.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.klikk.sigma.type.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.sql.Date;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {

    private String paymentMethod;

    private Double orderTotal;

    private String id;

    private LocalDateTime orderCreatedAt;

    private OrderStatus orderStatus;

    private String buyer;

}
