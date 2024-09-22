package com.klikk.sigma.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {

    private Integer id;

    private String email;

    private String firstname;

    private String lastname;
}
