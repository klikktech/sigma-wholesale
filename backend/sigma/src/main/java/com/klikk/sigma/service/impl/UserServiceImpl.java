package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.UserDto;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.error.NotFoundException;
import com.klikk.sigma.mapper.UserMapper;
import com.klikk.sigma.repository.UserRepository;
import com.klikk.sigma.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public UserDto findById(int id) {
        Optional<User> result = userRepository.findById(id);
        User user = null;
        if (result.isPresent()) {
            user = result.get();
        } else {
            throw new NotFoundException("User with id : " + id + " not found.");
        }
        return userMapper.userToUserDTO(user);
    }

    @Override
    public User findByEmail(String username) {
        Optional<User> result = userRepository.findByEmail(username);
        User user = null;
        if (result.isPresent()) {
            user = result.get();
        } else {
            throw new UsernameNotFoundException("User with username : " + username + " not found.");
        }
        return user;
    }

    @Override
    public UserDto save(User object) {
        User user = userRepository.save(object);
        return userMapper.userToUserDTO(user);
    }

    @Override
    public void deleteById(int id) {

    }
}
