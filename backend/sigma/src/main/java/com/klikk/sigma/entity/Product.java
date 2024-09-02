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
@Table(name = "products")
public class Product {
    @Id
    @SequenceGenerator(name = "products_sequence",sequenceName = "products_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "products_sequence")
    private int id;

    @OneToOne
    @JoinColumn(name = "vendor_id",referencedColumnName = "id")
    private Vendor vendorId;

    @Column(name = "product_name")
    private String productName;

    @ManyToOne
    @JoinColumn(name = "category_id",referencedColumnName = "id")
    private Category categoryId;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private double price;

    @Column(name = "stock_quantity")
    private int stockQuantity;

    @Column(name = "sku")
    private String sku;


}
