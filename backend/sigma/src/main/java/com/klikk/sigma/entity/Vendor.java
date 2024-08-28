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
@Table(name = "vendors")
public class Vendor {

    @Id
    @SequenceGenerator(name = "vendor_sequence",sequenceName = "vendor_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "vendor_sequence")
    private int id;
    private int userId;
    private String companyName;
    private String companyAddress;
    private String taxId;
    private String contactPerson;
    private String contactEmail;
    private String contactNumber;
}
