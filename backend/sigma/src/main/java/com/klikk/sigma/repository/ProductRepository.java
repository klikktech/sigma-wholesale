package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface ProductRepository extends JpaRepository<Product, Integer> {
    public Optional<Product> findByproductId(Long productId);
}
