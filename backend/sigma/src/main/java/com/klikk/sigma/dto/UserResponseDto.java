package com.klikk.sigma.dto;

import com.klikk.sigma.type.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {

    private String id;

    private String email;

    private String firstname;

    private String lastname;

    private RoleType role;
}
