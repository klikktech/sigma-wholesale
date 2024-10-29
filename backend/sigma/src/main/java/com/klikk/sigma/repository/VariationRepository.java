package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Product;
import com.klikk.sigma.entity.Variation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface VariationRepository extends JpaRepository<Variation, Integer> {
    Optional<Variation> findByDetails(String details);
}
