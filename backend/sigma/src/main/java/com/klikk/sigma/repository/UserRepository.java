package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Address;
import com.klikk.sigma.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    List<User> findByShippingAddress(Address address);


    @Query("SELECT u FROM User u WHERE " +
            "LOWER(u.email) LIKE LOWER(CONCAT('%',:keyword, '%')) OR " +
            "LOWER(u.firstname) LIKE LOWER(CONCAT('%',:keyword, '%')) OR " +
            "LOWER(u.lastname) LIKE LOWER(CONCAT('%',:keyword, '%'))")
    List<User> findByKeyword(@Param("keyword") String keyword);

//    User findByUserId(Integer userId);
}
