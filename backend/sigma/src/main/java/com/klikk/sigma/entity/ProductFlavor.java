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
@Table(name = "product_flavors")
public class ProductFlavor {
    @Id
    @SequenceGenerator(name = "flavors_sequence",sequenceName = "flavors_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "flavors_sequence")
    private int id;

    @ManyToOne
    @JoinColumn(name = "product_id",referencedColumnName = "id")
    private Product productId;

    @Column(name = "flavor_name")
    private String flavorName;

    @Column(name = "additional_price")
    private double additionalPrice;
}
