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
@Table(name = "categories")
public class Category {
    @Id
    @SequenceGenerator(name = "categories_sequence",sequenceName = "categories_sequence",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "categories_sequence")
    private int id;

    @Column(name = "category")
    private String categoryName;

    @Column (name = "description")
    private String description;

}
