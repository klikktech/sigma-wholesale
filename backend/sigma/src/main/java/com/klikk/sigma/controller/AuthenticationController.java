package com.klikk.sigma.controller;

import com.klikk.sigma.dto.request.AuthenticationRequest;
import com.klikk.sigma.dto.request.RegisterRequest;
import com.klikk.sigma.dto.response.AuthenticationResponse;
import com.klikk.sigma.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/admin/authenticate")
    public ResponseEntity<AuthenticationResponse> adminAuthenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.adminAuthenticate(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(authenticationService.refreshToken(request, response));
    }

    @PostMapping("/pass")
    public boolean pass(@RequestBody String hash, @RequestParam String pass) {
//        PasswordEncoder passPasswordEncoder = new PhpPassPasswordEncoder();
        return passwordEncoder.matches(pass, hash);
    }

    @GetMapping("/greet")
    public ResponseEntity<String> greeting(){

        return ResponseEntity.ok(String.format("<h1>Hello Guys, The deployment is working!!!</h1>"));
    }
}
