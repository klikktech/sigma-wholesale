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
    private int vendorId;
    private String productName;
    private int categoryId;
    private String description;
    private double price;
    private int stockQuantity;
    private String sku;


}
