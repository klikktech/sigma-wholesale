package com.klikk.sigma.dto.request;

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

    private String nickname;

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
}
