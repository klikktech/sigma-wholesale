package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.AuthenticationResponse;
import com.klikk.sigma.dto.RegisterRequest;
import com.klikk.sigma.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper(componentModel = "spring")
public abstract class AuthenticationMapper {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Mapping(source = "password", target = "passwordHash", qualifiedByName = "encodePassword")
    @Mapping(source = "username", target = "username")
    public abstract User registerRequestToUser(RegisterRequest request);

    @Mapping(source = "jwtToken", target = "accessToken")
    @Mapping(source = "refreshToken", target = "refreshToken")
    public abstract AuthenticationResponse jwtTokenToAuthenticationResponse(String jwtToken, String refreshToken);

    @Named("encodePassword")
    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }
}
