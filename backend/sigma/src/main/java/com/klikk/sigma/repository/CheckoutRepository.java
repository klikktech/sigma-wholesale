package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Checkout;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckoutRepository extends JpaRepository<Checkout,String> {
}
