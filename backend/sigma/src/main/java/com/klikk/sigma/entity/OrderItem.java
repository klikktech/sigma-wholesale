package com.klikk.sigma.entity;

import com.klikk.sigma.util.StringPrefixedSequenceGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_item_sequence")
    @GenericGenerator(
            name="order_item_sequence",
            type = com.klikk.sigma.util.StringPrefixedSequenceGenerator.class,
            parameters = {
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.INCREMENT_PARAM, value = "1"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.PREFIX_VALUE_PARAM, value = "ODR_ITM_"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.NUMBER_FORMAT_PARAM,value = "%d")
            }
    )
    private String id;

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
