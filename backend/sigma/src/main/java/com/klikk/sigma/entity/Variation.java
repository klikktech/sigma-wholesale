package com.klikk.sigma.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.klikk.sigma.utils.StringPrefixedSequenceGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "variations")
public class Variation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "variations_sequence")
    @GenericGenerator(
            name="variations_sequence",
            type = com.klikk.sigma.utils.StringPrefixedSequenceGenerator.class,
            parameters = {
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.INCREMENT_PARAM, value = "1"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.PREFIX_VALUE_PARAM, value = "ATT_"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.NUMBER_FORMAT_PARAM,value = "%d")
            }
    )
    private String id;

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

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    @Column(name = "order_count")
    private int orderCount;

    @ManyToOne
    @JoinColumn(name = "parent_id", referencedColumnName = "id")
    private Product parent;
}
