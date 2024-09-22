package com.klikk.sigma.service;

import com.klikk.sigma.entity.Address;

public interface AddressService {

    public Address saveAddress(String address, String city, String state, String zipcode);
}
