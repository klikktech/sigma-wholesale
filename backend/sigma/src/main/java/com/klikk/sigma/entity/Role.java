package com.klikk.sigma.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "roles")
public class Role {
    @Id
    @SequenceGenerator(name = "roles_sequence",sequenceName = "roles_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "roles_sequence")
    private Integer id;
    private String roleName;
    private String description;
}
