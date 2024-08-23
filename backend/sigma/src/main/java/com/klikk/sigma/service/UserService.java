package com.klikk.sigma.service;

import com.klikk.sigma.dto.UserDto;
import com.klikk.sigma.entity.User;

import java.util.List;

public interface UserService {
    public List<User> findAll();

    public UserDto findById(int id);

    public UserDto save(User object);

    public void deleteById(int id);
}
