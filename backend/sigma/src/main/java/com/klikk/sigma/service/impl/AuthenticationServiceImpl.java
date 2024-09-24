package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.AuthenticationRequest;
import com.klikk.sigma.dto.AuthenticationResponse;
import com.klikk.sigma.dto.RegisterRequest;
import com.klikk.sigma.entity.Address;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.mapper.AuthenticationMapper;
import com.klikk.sigma.repository.UserRepository;
import com.klikk.sigma.service.AuthenticationService;
import com.klikk.sigma.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private AuthenticationMapper authenticationMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AddressServiceImpl addressServiceImpl;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        User user = authenticationMapper.registerRequestToUser(request);

        // Save store address
        Address storeAddress = null;
        if (request.getStoreAddress() != null) {
            storeAddress = addressServiceImpl.saveAddress(
                    request.getStoreAddress(),
                    request.getStoreCity(),
                    request.getStoreState(),
                    request.getStoreZip()
            );

            if (user.getStoreAddress() == null) {
                user.setStoreAddress(new ArrayList<>());
            }
            user.getStoreAddress().add(storeAddress);

        }

        // Save shipping address
        Address shippingAddress = null;
        if (request.getShippingAddress() != null) {
            shippingAddress = addressServiceImpl.saveAddress(
                    request.getShippingAddress(),
                    request.getShippingCity(),
                    request.getShippingState(),
                    request.getShippingZip()
            );
            if (user.getShippingAddress() == null) {
                user.setShippingAddress(new ArrayList<>());
            }
            user.getShippingAddress().add(shippingAddress);


        }

        // Handle createdAt
        if (request.getCreatedAt() == null) {
            user.setCreatedAt(LocalDateTime.now());
        }

        // Save user
        userRepository.save(user);

        // Generate JWT tokens
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return authenticationMapper.jwtTokenToAuthenticationResponse(jwtToken, refreshToken);
    }


    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        return authenticationMapper.jwtTokenToAuthenticationResponse(jwtToken, refreshToken);
    }
}
