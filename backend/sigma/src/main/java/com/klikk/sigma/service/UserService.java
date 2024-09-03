package com.klikk.sigma.service;

import com.klikk.sigma.dto.UserDto;
import com.klikk.sigma.entity.User;

import java.util.List;


public interface UserService {
    List<User> findAll();

    UserDto findById(int id);

    User findByEmail(String username);

    UserDto save(User object);

    void deleteById(int id);
}
