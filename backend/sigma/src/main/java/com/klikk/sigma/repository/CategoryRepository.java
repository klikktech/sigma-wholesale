package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Category;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, String> {

    Category findFirstByName(String name);

    Category findBySlugAndType(String slug, String type);

    List<Category> findAllByType(String type);

    boolean existsBySlug(String slug);

    List<Category> findByNameContainingIgnoreCase(String name);
}