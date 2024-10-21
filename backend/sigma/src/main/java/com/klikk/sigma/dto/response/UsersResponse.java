package com.klikk.sigma.dto.response;

import com.klikk.sigma.type.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsersResponse {
    private String id;

    private String email;

    private String name;

    private String username;

    private LocalDateTime createdAt;

    private String phone;

    private RoleType role;
}
