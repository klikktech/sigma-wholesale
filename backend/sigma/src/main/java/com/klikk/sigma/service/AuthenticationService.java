package com.klikk.sigma.service;

import com.klikk.sigma.dto.AuthenticationRequest;
import com.klikk.sigma.dto.AuthenticationResponse;
import com.klikk.sigma.dto.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

public interface AuthenticationService {

    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse authenticate(AuthenticationRequest request);

    AuthenticationResponse refreshToken(HttpServletRequest request, HttpServletResponse response);
}
