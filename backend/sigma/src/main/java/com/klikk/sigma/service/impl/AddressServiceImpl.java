package com.klikk.sigma.service.impl;

import com.klikk.sigma.entity.Address;
import com.klikk.sigma.repository.AddressRepository;
import com.klikk.sigma.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;
    @Override
    public Address saveAddress(String address, String city, String state, String zipcode) {
        Address newAddress=new Address();
        newAddress.setAddress(address);
        newAddress.setCity(city);
        newAddress.setState(state);
        newAddress.setZipcode(zipcode);
        return addressRepository.save(newAddress);
    }

    public Optional<Address> getAddress(String address){
        return addressRepository.findByAddress(address);
    }
}
