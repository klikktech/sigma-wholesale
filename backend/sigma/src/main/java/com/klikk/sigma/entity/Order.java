package com.klikk.sigma.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name ="orders")
public class Order {

    @Id
    @SequenceGenerator(name = "orders_sequence",sequenceName = "orders_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "orders_sequence")
    private int id;
//    private User buyer;
    private Date orderDate;
    private String shippingAddress;
    private String orderStatus;
    private double totalAmount;
}
