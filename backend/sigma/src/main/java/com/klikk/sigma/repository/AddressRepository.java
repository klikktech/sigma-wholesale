package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address,Integer> {
    public Optional<Address> findByAddress(String address);
}
