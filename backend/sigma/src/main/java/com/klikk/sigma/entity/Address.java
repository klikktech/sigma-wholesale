package com.klikk.sigma.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "address")
public class Address {

    @Id
    @SequenceGenerator(name = "address_sequence",sequenceName = "address_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "address_sequence")
    private Integer id;

    @Column(name = "address")
    private String address;

    @Column(name = "store_city")
    private String city;

    @Column(name = "store_state")
    private String state;

    @Column(name = "store_zip")
    private String zipcode;
}
