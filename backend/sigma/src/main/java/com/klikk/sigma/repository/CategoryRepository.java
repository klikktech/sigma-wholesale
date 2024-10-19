package com.klikk.sigma.repository;


import com.klikk.sigma.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,String> {
    Optional<Category> findByCategoryId(Long categoryId);
}
