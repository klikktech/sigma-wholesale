package com.klikk.sigma.service;

import com.klikk.sigma.entity.Address;
import com.klikk.sigma.entity.User;

public interface AddressService {

    public Address saveAddress(String address, String city, String state, String zipcode, User user);
}
