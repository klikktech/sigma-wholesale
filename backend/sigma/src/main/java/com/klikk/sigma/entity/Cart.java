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
@Table(name = "cart")
public class Cart {

    @Id
    @SequenceGenerator(name = "cart_sequence",sequenceName = "cart_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "cart_sequence")
    private int id;
    private int userId;
    private Date createdAt;
    private Date updatedAt;
}
