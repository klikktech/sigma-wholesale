package com.klikk.sigma.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public enum RoleType {
    USER(
            Set.of(
                    PermissionType.USER_READ,
                    PermissionType.USER_WRITE,
                    PermissionType.USER_PUT,
                    PermissionType.USER_DELETE
            )
    ),
    ADMIN(
            Set.of(
                    PermissionType.ADMIN_READ,
                    PermissionType.ADMIN_WRITE,
                    PermissionType.ADMIN_PUT,
                    PermissionType.ADMIN_DELETE
            )
    );

    @Getter
    private final Set<PermissionType> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions().stream().map(
                permission -> new SimpleGrantedAuthority(permission.getPermission())
        ).collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
