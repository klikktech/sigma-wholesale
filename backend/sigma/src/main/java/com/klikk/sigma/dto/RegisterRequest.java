package com.klikk.sigma.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.klikk.sigma.utils.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private Integer userId;

    private String firstname;

    private String lastname;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    private String email;

    private String password;

    private String phone;

    private String storeAddress;

    private String storeCity;

    private String storeState;

    private String storeZip;

    private String shippingAddress;

    private String shippingCity;

    private String shippingState;

    private String shippingZip;

//    private MultipartFile taxDocument;
    @Enumerated(EnumType.STRING)
    private Role role;
}
