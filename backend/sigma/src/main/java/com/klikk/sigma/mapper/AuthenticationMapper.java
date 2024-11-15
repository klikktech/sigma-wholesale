package com.klikk.sigma.mapper;

import com.klikk.sigma.dto.response.AuthenticationResponse;
import com.klikk.sigma.dto.request.RegisterRequest;
import com.klikk.sigma.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public abstract class AuthenticationMapper {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Mapping(source = "password", target = "passwordHash", qualifiedByName = "encodePassword")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "storeAddress",ignore = true)
    @Mapping(target = "shippingAddress",ignore = true)
    @Mapping(target = "role", ignore = true)
    public abstract User registerRequestToUser(RegisterRequest request);



    @Mapping(source = "jwtToken", target = "accessToken")
    @Mapping(source = "refreshToken", target = "refreshToken")
    public abstract AuthenticationResponse jwtTokenToAuthenticationResponse(String jwtToken, String refreshToken);

    @Named("encodePassword")
    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

}
