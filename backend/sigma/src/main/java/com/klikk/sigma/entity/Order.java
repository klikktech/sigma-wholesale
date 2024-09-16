package com.klikk.sigma.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.sql.Date;
import java.time.LocalDateTime;

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


    @Column(name = "order_id", unique = true)
    private Integer orderId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "order_creation_date")
    private LocalDateTime orderCreatedAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "order_modified_date")
    private LocalDateTime orderModifiedAt;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private User buyer;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "customer_ip")
    private String customerIp;

    @Column(name = "order_total")
    private Double orderTotal;

}
