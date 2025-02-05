package com.klikk.sigma.service;

import com.klikk.sigma.dto.request.AuthenticationRequest;
import com.klikk.sigma.dto.request.ResetPasswordRequest;
import com.klikk.sigma.dto.response.AuthenticationResponse;
import com.klikk.sigma.dto.request.RegisterRequest;
import com.klikk.sigma.type.RegistrationType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthenticationService {

    AuthenticationResponse register(RegisterRequest request, RegistrationType registrationType);

    AuthenticationResponse authenticate(AuthenticationRequest request);

    AuthenticationResponse adminAuthenticate(AuthenticationRequest request);

    AuthenticationResponse refreshToken(HttpServletRequest request, HttpServletResponse response);

}
