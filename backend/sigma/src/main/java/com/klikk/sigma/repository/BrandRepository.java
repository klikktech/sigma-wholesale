package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BrandRepository extends JpaRepository<Brand,String> {
    public Optional<Brand> findByName(String name);
}
