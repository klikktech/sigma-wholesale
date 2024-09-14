package com.klikk.sigma.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "variations")
public class Variation {

    @Id
    @SequenceGenerator(name = "variations_sequence",sequenceName = "variations_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "variations_sequence")
    private int id;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "type_info")
    private String typeInfo;

    @Column(name = "name")
    private String variationName;

    @Column(name = "sku",unique = true)
    private String sku;

    @Column(name = "min_price")
    private double minPrice;

    @Column(name = "max_price")
    private double maxPrice;

    @Column(name = "display_status")
    private String displayStatus;

    @Column(name = "stock_status")
    private String stockStatus;

    @Column(name = "stock_quantity")
    private int stockQuantity;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    @Column(name = "order_count")
    private int orderCount;

    @ManyToOne
    @JoinColumn(name = "parent_id", referencedColumnName = "id")
    private Product parent;
}
