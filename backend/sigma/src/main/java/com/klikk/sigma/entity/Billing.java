package com.klikk.sigma.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "billing_details")
public class Billing {

    @Id
    @SequenceGenerator(name = "billing_sequence", sequenceName = "billing_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "billing_sequence")
    private String ID;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "address")
    private  String address;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "postcode")
    private Integer postcode;

    @Column(name = "country")
    private String country;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;
}
