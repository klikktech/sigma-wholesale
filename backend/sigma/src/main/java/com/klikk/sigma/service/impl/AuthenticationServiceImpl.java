package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.request.AuthenticationRequest;
import com.klikk.sigma.dto.request.ResetPasswordRequest;
import com.klikk.sigma.dto.response.AuthenticationResponse;
import com.klikk.sigma.dto.request.RegisterRequest;
import com.klikk.sigma.entity.Address;
import com.klikk.sigma.entity.PasswordResetToken;
import com.klikk.sigma.entity.Token;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.exception.UnauthorisedException;
import com.klikk.sigma.mapper.AuthenticationMapper;
import com.klikk.sigma.repository.PasswordResetTokenRepository;
import com.klikk.sigma.repository.TokenRepository;
import com.klikk.sigma.repository.UserRepository;
import com.klikk.sigma.service.AuthenticationService;
import com.klikk.sigma.service.EmailService;
import com.klikk.sigma.service.JwtService;
import com.klikk.sigma.type.RoleType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private AuthenticationMapper authenticationMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AddressServiceImpl addressService;



    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("User already exists");
        }
        User user = authenticationMapper.registerRequestToUser(request);
        user.setCreatedAt(LocalDateTime.now());
        user.setRole(RoleType.PENDING);

        Optional<Address> storeAddress= addressService.getAddress(request.getStoreAddress());
        if(storeAddress.isPresent()){
            if(user.getStoreAddress()==null){
                user.setStoreAddress(new ArrayList<>());
            }
            user.getStoreAddress().add(storeAddress.get());
        }

        Optional<Address> shippingAddress= addressService.getAddress(request.getShippingAddress());
        if(shippingAddress.isPresent()){
            if(user.getShippingAddress()==null){
                user.setShippingAddress(new ArrayList<>());
            }
            user.getShippingAddress().add(shippingAddress.get());
        }

        if (storeAddress.isEmpty() && request.getStoreAddress() != null) {
            Address newStoreAddress = null;
            newStoreAddress = addressService.saveAddress(
                    request.getStoreAddress(),
                    request.getStoreCity(),
                    request.getStoreState(),
                    request.getStoreZip(),
                    user
            );

            if (user.getStoreAddress() == null) {
                user.setStoreAddress(new ArrayList<>());
            }
            user.getStoreAddress().add(newStoreAddress);

        }

        // Save shipping address
        if (shippingAddress.isEmpty() && request.getShippingAddress() != null) {
            Address newShippingAddress = null;
            newShippingAddress = addressService.saveAddress(
                    request.getShippingAddress(),
                    request.getShippingCity(),
                    request.getShippingState(),
                    request.getShippingZip(),
                    user
            );
            if (user.getShippingAddress() == null) {
                user.setShippingAddress(new ArrayList<>());
            }
            user.getShippingAddress().add(newShippingAddress);
        }

        User savedUser = userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(jwtToken, refreshToken, savedUser);
        return authenticationMapper.jwtTokenToAuthenticationResponse(jwtToken, refreshToken);
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new NotFoundException("No user found"));
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(jwtToken, refreshToken, user);
        return authenticationMapper.jwtTokenToAuthenticationResponse(jwtToken, refreshToken);
    }

    @Override
    public AuthenticationResponse adminAuthenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new NotFoundException("No user found"));
        RoleType role = user.getRole();
        if(role.equals(RoleType.ADMIN)){
            String jwtToken = jwtService.generateToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);
            revokeAllUserTokens(user);
            saveUserToken(jwtToken, refreshToken, user);
            return authenticationMapper.jwtTokenToAuthenticationResponse(jwtToken, refreshToken);
        }
        else {
            throw new UnauthorisedException("You don't have enough permissions to login");
        }
    }

    @Override
    public AuthenticationResponse refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorisedException("Unauthorised");
        }
        String token = authHeader.substring(7);
        String email = jwtService.extractUsername(token);
        if (email != null) {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new NotFoundException("No user found"));
            if (jwtService.isRefreshTokenValid(token, user)) {
                String accessToken = jwtService.generateToken(user);
                String refreshToken = jwtService.generateRefreshToken(user);
                revokeAllUserTokens(user);
                saveUserToken(accessToken, refreshToken, user);
                return authenticationMapper.jwtTokenToAuthenticationResponse(accessToken, refreshToken);
            }
        }
        throw new UnauthorisedException("Unauthorised");
    }

    private void saveUserToken(String accessToken, String refreshToken, User user) {
        Token token = Token.builder().user(user).accessToken(accessToken).refreshToken(refreshToken).loggedOut(false).build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        List<Token> validUserTokens = tokenRepository.findAllAccessTokensByUser(user.getId());
        if (validUserTokens.isEmpty()) return;
        validUserTokens.forEach(token -> {
            token.setLoggedOut(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
