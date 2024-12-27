package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Brand;
import com.klikk.sigma.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findById(String productId);

    Optional<Product> findBySku(String sku);

    List<Product> findTop6ByStatusOrderByCreatedAtDesc(String status);

    Optional<Product> findByDetails(String details);

    boolean existsByDetails(String details);

    @Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword%")
    Page<Product> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

    Page<Product> findByBrand(Brand brand, Pageable pageable);
}
