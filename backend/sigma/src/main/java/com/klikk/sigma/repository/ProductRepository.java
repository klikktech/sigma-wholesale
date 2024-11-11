package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findById(String productId);

    Optional<Product> findBySku(String sku);

    List<Product> findTop6ByStatusOrderByCreatedAtDesc(String status);

    Optional<Product> findByDetails(String details);

    boolean existsByDetails(String details);
}
