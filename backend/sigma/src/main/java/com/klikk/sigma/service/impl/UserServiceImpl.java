package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.UserResponseDto;
import com.klikk.sigma.dto.request.RegisterRequest;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.dto.response.UsersResponse;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.mapper.AuthenticationMapper;
import com.klikk.sigma.mapper.UserMapper;
import com.klikk.sigma.repository.UserRepository;
import com.klikk.sigma.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressServiceImpl addressServiceImpl;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private AuthenticationMapper authenticationMapper;


    @Override
    public List<UsersResponse> findAll() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .sorted(Comparator.comparing(User::getCreatedAt).reversed())
                .map(user -> userMapper.userToUserResponse(user))
                .collect(Collectors.toList());
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

    @Override
    public UsersResponse findUserByEmail(String email) {
        Optional<User> result = userRepository.findByEmail(email);
        User user = null;
        if (result.isPresent()) {
            user = result.get();
        } else {
            throw new UsernameNotFoundException("User with username : " + email + " not found.");
        }
        return userMapper.userToUserResponse(user);
    }

    @Override
    public SuccessResponse addUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }
        User user = authenticationMapper.registerRequestToUser(request);
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);
        return new SuccessResponse(LocalDateTime.now(), "User created successfully");
    }
}
