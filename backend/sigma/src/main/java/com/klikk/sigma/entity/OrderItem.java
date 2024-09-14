package com.klikk.sigma.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "order_items")
public class OrderItem {
    @Id
    @SequenceGenerator(name = "Order_items_sequence",sequenceName = "Order_items_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "Order_item_sequence")
    private int id;

    @ManyToOne
    @JoinColumn(name = "order_id",referencedColumnName = "id")
    private Order orderId;

    @ManyToOne
    @JoinColumn(name = "product_id",referencedColumnName = "id")
    private Product productId;

    @ManyToOne
    @JoinColumn(name = "variation_id",referencedColumnName = "id")
    private Variation variationId;

    @Column(name = "quantity")
    private int quantity;
}
