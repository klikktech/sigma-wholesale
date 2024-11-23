package com.klikk.sigma.dto.response;

import com.klikk.sigma.entity.Address;
import com.klikk.sigma.type.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsersResponse {
    private String id;

    private String email;

    private String name;

    private String firstname;

    private String lastname;

    private String username;

    private LocalDateTime createdAt;

    private String phone;

    private RoleType role;

    private List<Address> storeAddress;
}
