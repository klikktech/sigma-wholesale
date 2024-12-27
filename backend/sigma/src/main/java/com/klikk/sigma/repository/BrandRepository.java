package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand,String> {
    Brand findByName(String name);
}
