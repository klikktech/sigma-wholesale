package com.klikk.sigma.service.impl;

import com.klikk.sigma.entity.Address;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.repository.AddressRepository;
import com.klikk.sigma.repository.UserRepository;
import com.klikk.sigma.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Address saveAddress(String address, String city, String state, Long zipcode, User user) {
        Address newAddress=new Address();
        newAddress.setAddress(address);
        newAddress.setCity(city);
        newAddress.setState(state);
        newAddress.setZipcode(zipcode);

        return addressRepository.save(newAddress);
    }

    @Override
    public void deleteAddress(String address) {
        Optional<Address> toDeleteAddress=addressRepository.findByAddress(address);
        if(toDeleteAddress.isEmpty()){
            throw new NotFoundException("Address not found!");
        }
        List<User> usersWithAddress= userRepository.findByShippingAddress(toDeleteAddress.get());
        for (User user : usersWithAddress) {
            user.getShippingAddress().remove(toDeleteAddress.get());
            userRepository.save(user);
        }
        addressRepository.delete(toDeleteAddress.get());
    }

    public Optional<Address> getAddress(String address){
        return addressRepository.findByAddress(address);
    }
}
