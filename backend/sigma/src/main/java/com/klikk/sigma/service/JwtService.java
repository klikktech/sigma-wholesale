package com.klikk.sigma.service;

import com.klikk.sigma.entity.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    String extractUsername(String jwt);

    boolean isTokenValid(String jwt, UserDetails userDetails);

    boolean isRefreshTokenValid(String jwt, UserDetails userDetails);

    String generateToken(User user);

    String generateRefreshToken(User user);
}
