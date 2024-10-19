package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review,String> {
}
