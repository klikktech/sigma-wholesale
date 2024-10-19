package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ProductRepository extends JpaRepository<Product, Integer> {
    public Optional<Product> findById(Integer productId);
    public Optional<Product> findByProductId(Long productId);
}
