package com.klikk.sigma.controller;

import com.klikk.sigma.dto.AuthenticationRequest;
import com.klikk.sigma.dto.AuthenticationResponse;
import com.klikk.sigma.dto.RegisterRequest;
import com.klikk.sigma.service.AuthenticationService;
import com.klikk.sigma.service.impl.AuthenticationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationServiceImpl authenticationServiceImpl;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationServiceImpl.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationServiceImpl.authenticate(request));
    }
}
