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
@Table(name = "tracking")
public class Tracking {
    @Id
    @SequenceGenerator(name = "tracking_sequence",sequenceName = "tracking_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "tracking_sequence")
    private int id;

    @OneToOne
    @JoinColumn(name = "order_id",referencedColumnName = "id")
    private Order orderId;

    @Column(name = "tracking_status")
    private String trackingStatus;

    @Column(name = "tracking_number")
    private String trackingNumber;

    @Column(name = "tracking_method")
    private String trackingMethod;

    @Column(name = "tracking_date")
    private Date trackingDate;
}
