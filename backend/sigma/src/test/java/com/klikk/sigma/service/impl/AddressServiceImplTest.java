package com.klikk.sigma.service.impl;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AddressServiceImplTest {

    @Autowired
    AddressServiceImpl addressService;

    @Test
    public void addAddress(){
        addressService.saveAddress("451 Thomas Mill Rd Lot 17","chicago","IL","60616");
    }
    
}