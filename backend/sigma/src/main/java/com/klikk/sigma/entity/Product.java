package com.klikk.sigma.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.klikk.sigma.type.ProductType;
import com.klikk.sigma.util.StringPrefixedSequenceGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_sequence")
    @GenericGenerator(
            name="product_sequence",
            type = com.klikk.sigma.util.StringPrefixedSequenceGenerator.class,
            parameters = {
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.INCREMENT_PARAM, value = "1"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.PREFIX_VALUE_PARAM, value = "PDT_"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.NUMBER_FORMAT_PARAM,value = "%d")
            }
    )
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private double price;

    @Column(name = "sku",unique = true)
    private String sku;

    @Column(name = "details")
    private String details;

    @Column(name = "sale_price")
    private double salePrice;

    @Column(name = "on_sale")
    private boolean isOnSale;

    @Column(name = "stock_status")
    private String status;

    @Column(name = "display_status")
    private String displayStatus;

    @Column(name = "stock_quantity")
    private Long stockQuantity;

    @Column(name = "total_sales")
    private int totalSales;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    private ProductType productType;

    @Column(name = "product_id", unique = true)
    private Long productId;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "product_categories",
            joinColumns = @JoinColumn(name = "product_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "category_id",referencedColumnName = "id")
    )
    private List<Category> categories;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "parent")
    private List<Variation> variations;

    @Column(name = "case_quantity")
    private Long caseQuantity;

    @Column(name = "box_quantity")
    private Long boxQuantity;

    @ManyToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    private Brand brand;

}
