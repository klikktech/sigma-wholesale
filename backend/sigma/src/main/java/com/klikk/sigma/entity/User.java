package com.klikk.sigma.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.klikk.sigma.type.RoleType;
import com.klikk.sigma.util.StringPrefixedSequenceGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_sequence")
    @GenericGenerator(
            name="users_sequence",
            type = com.klikk.sigma.util.StringPrefixedSequenceGenerator.class,
            parameters = {
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.INCREMENT_PARAM, value = "1"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.PREFIX_VALUE_PARAM, value = "USR_"),
                    @org.hibernate.annotations.Parameter(name = StringPrefixedSequenceGenerator.NUMBER_FORMAT_PARAM,value = "%d")
            }
    )
    private String id;

    @Column(name = "user_id",nullable = false,unique = true)
    private Integer userId;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "nickname")
    private String nickname;

    @Column(nullable = false,unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "phone")
    private String phone;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_store_address",
            joinColumns = @JoinColumn(name = "user_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "address_id",referencedColumnName = "id")
    )
    private List<Address> storeAddress;

    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_shipping_address",
            joinColumns = @JoinColumn(name = "user_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "address_id",referencedColumnName = "id")
    )
    private List<Address> shippingAddress;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private RoleType role;

//    @OneToOne
//    @JoinColumn(name = "id")
//    private Attachment taxDocument;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
