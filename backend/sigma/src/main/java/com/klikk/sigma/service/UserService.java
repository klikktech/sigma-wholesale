package com.klikk.sigma.service;


import com.klikk.sigma.dto.UserResponseDto;
import com.klikk.sigma.entity.User;

import java.util.List;


public interface UserService {

    List<User> findAll();

    UserResponseDto findById(Integer id);

    User findByEmail(String email);
}
