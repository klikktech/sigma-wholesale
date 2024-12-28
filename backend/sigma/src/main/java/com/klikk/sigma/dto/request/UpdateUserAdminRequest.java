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

    private String newPassword;

    private String email;

    private String phone;

    private String role;

    private String storeAddress;

    private String storeCity;

    private String storeState;

    private String storeZip;
}
