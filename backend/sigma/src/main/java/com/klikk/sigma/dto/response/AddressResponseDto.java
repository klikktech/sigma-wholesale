package com.klikk.sigma.dto.response;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressResponseDto {

    private String address;

    private String city;

    private String state;

    private Long zipcode;

    private String firstName;

    private String lastName;

    private String phone;
}
