

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
@Table(name = "cart_items")
public class CartItem {
    @Id
    @SequenceGenerator(name = "cart_items_sequence",sequenceName = "cart_items_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "cart_items_sequence")
    private int id;

    @ManyToOne
    @JoinColumn(name = "cart_id",referencedColumnName = "id")
    private Cart cartId;

    @OneToOne
    @JoinColumn(name = "product_id",referencedColumnName = "id")
    private Product productId;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "added_at")
    private Date addedAt;
}
