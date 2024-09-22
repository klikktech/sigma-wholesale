package com.klikk.sigma.repository;

import com.klikk.sigma.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    User findByUserId(Integer userId);
}
