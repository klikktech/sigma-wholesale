package com.klikk.sigma.service;


import com.klikk.sigma.dto.UserResponseDto;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.imports.dto.UserDto;

import java.io.IOException;
import java.util.List;


public interface UserService {

    List<User> findAll();

    UserResponseDto findById(int id);

    User findByEmail(String email);
}
