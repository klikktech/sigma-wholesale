package com.klikk.sigma.service.impl;

import com.klikk.sigma.dto.AuthenticationRequest;
import com.klikk.sigma.dto.AuthenticationResponse;
import com.klikk.sigma.dto.RegisterRequest;
import com.klikk.sigma.entity.Token;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.error.UnauthorisedException;
import com.klikk.sigma.mapper.AuthenticationMapper;
import com.klikk.sigma.repository.TokenRepository;
import com.klikk.sigma.repository.UserRepository;
import com.klikk.sigma.service.AuthenticationService;
import com.klikk.sigma.service.JwtService;
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
import java.util.List;

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
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        User user = authenticationMapper.registerRequestToUser(request);
        if (request.getCreatedAt() == null) {
            user.setCreatedAt(LocalDateTime.now());
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
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(jwtToken, refreshToken, user);
        return authenticationMapper.jwtTokenToAuthenticationResponse(jwtToken, refreshToken);
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
                    .orElseThrow(() -> new UsernameNotFoundException("No user found"));
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
