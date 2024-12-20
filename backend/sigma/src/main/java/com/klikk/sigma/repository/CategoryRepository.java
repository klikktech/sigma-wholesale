package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Category;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, String> {

    @EntityGraph(attributePaths = {"parentCategory", "childCategories"})
    Category findFirstByName(String name);

    @EntityGraph(attributePaths = {"parentCategory", "childCategories"})
    Category findBySlugAndType(String slug, String type);

    @EntityGraph(attributePaths = {"parentCategory", "childCategories"})
    List<Category> findByType(String type);

    boolean existsBySlug(String slug);
}