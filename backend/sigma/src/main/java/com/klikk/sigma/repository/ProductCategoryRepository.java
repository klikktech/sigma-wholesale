package com.klikk.sigma.repository;

import com.klikk.sigma.dto.response.ProductResponseDto;
import com.klikk.sigma.entity.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductCategoryRepository {

    @Query("SELECT p FROM Product p JOIN p.categories c WHERE c.id = :categoryId")
    List<ProductResponseDto> findAllByCategoryId(@Param("categoryId") Long categoryId);
}
