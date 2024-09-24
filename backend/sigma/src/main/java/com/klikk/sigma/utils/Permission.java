package com.klikk.sigma.utils;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_WRITE("admin:write"),
    ADMIN_PUT("admin:put"),
    ADMIN_DELETE("admin:delete"),

    USER_READ("user:read"),
    USER_WRITE("user:write"),
    USER_PUT("user:put"),
    USER_DELETE("user:delete")
    ;

    @Getter
    private final String permission;
}
