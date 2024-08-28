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
    private int orderId;
    private String trackingStatus;
    private String trackingNumber;
    private String trackingMethod;
    private Date trackingDate;
}
