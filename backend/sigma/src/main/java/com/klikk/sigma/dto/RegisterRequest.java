package com.klikk.sigma.dto;

import com.klikk.sigma.utils.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String firstname;

    private String lastname;

    private String email;

    private String password;

    private String username;

    private String phoneNumber;
    
    private String address;

    private Role role;
}
