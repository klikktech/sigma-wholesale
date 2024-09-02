package com.klikk.sigma;

import com.klikk.sigma.entity.User;
import com.klikk.sigma.utils.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfiguration{

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeHttpRequests(registry -> registry
//                        .requestMatchers("/public/**").permitAll() // Allow access to all URLs under /public without authentication
//                        .anyRequest().authenticated() // All other URLs require authentication
//                );
//
//
//        return http.build();
//    }


    @Bean
    public UserDetailsService userDetailsService() {
        PasswordEncoder encoder = passwordEncoder();


        User normalUser= User.builder().username("Pranav")
                .email("pranav@gmail.com")
                .address("2951 S king drive")
                .firstName("Pranav Kaushik")
                .lastName("Dhara")
                .phoneNumber("3124776452")
                .role(Role.USER)
                .passwordHash(encoder.encode("Hshpassworde"))
                .build();

        return new InMemoryUserDetailsManager(normalUser);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
