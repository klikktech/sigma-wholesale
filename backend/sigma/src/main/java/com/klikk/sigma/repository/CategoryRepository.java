package com.klikk.sigma.repository;


import com.klikk.sigma.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,String> {

    public Category findFirstByName(String name);

    public Category findBySlugAndType(String name,String type);

    public List<Category> findByType(String type);
}
