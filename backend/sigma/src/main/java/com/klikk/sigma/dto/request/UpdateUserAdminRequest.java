package com.klikk.sigma.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserAdminRequest {

    private String firstname;

    private String lastname;

    private String nickname;

    private String newPassword;

    private String email;

    private String phone;

    private String role;
}
