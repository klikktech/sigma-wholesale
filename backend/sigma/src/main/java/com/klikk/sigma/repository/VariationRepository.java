package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Variation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface VariationRepository extends JpaRepository<Variation, Integer> {
}
