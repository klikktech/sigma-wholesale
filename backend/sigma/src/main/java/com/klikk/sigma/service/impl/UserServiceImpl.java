package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.UserResponseDto;
import com.klikk.sigma.entity.Address;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.error.NotFoundException;
//import com.klikk.sigma.imports.dto.UserDto;
import com.klikk.sigma.mapper.UserMapper;
import com.klikk.sigma.repository.UserRepository;
import com.klikk.sigma.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressServiceImpl addressServiceImpl;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private AttachmentServiceImpl attachmentServiceImpl;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public UserResponseDto findById(Integer id) {
        Optional<User> result = userRepository.findById(id);
        User user = null;
        if (result.isPresent()) {
            user = result.get();
        } else {
            throw new NotFoundException("User with id : " + id + " not found.");
        }
        return userMapper.userToUserResponseDto(user);
    }

    @Override
    public User findByEmail(String email) {
        Optional<User> result = userRepository.findByEmail(email);
        User user = null;
        if (result.isPresent()) {
            user = result.get();
        } else {
            throw new UsernameNotFoundException("User with username : " + email + " not found.");
        }
        return user;
    }
}
