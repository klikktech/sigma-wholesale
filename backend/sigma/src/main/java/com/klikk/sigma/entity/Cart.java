package com.klikk.sigma.entity;

import com.klikk.sigma.util.StringPrefixedSequenceGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cart_sequence")
    @GenericGenerator(
            name="cart_sequence",
            type = com.klikk.sigma.util.StringPrefixedSequenceGenerator.class,
            parameters = {
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.INCREMENT_PARAM, value = "1"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.PREFIX_VALUE_PARAM, value = "CT_"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.NUMBER_FORMAT_PARAM,value = "%d")
            }
    )
    private String id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    @Column(name = "price")
    private double price;

    @Column(name = "quantity")
    private Long quantity;

    @OneToOne
    @JoinColumn(name = "product_id",referencedColumnName = "id")
    private Product product;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
