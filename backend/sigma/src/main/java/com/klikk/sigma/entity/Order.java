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

    @ManyToOne
    @JoinColumn(name = "buyer_id",referencedColumnName = "id")
    private User buyerId;

    @Column(name = "order_date")
    private Date orderDate;

    @Column(name = "shipping_address")
    private String shippingAddress;

    @Column(name = "order_status")
    private String orderStatus;

    @Column(name = "total_amount")
    private double totalAmount;
}
