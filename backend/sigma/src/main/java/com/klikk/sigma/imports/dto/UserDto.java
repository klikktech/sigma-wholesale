package com.klikk.sigma.imports.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.klikk.sigma.utils.Role;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {
    private Integer userId;

    private String firstname;

    private String lastname;

    private String email;

    private String passwordHash;

    private String phone;

    private String storeAddress;

    private String storeCity;

    private String storeState;

    private String storeZip;

    private String shippingAddress;

    private String shippingCity;

    private String shippingState;

    private String shippingZip;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

//    private MultipartFile taxDocument;

    @Enumerated(EnumType.STRING)
    private Role role;
}
