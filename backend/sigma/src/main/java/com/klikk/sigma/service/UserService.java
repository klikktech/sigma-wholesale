package com.klikk.sigma.service;


import com.klikk.sigma.dto.UserResponseDto;
import com.klikk.sigma.dto.request.RegisterRequest;
import com.klikk.sigma.dto.request.UpdateUserAdminRequest;
import com.klikk.sigma.dto.request.UpdateUserRequest;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.dto.response.UsersResponse;
import com.klikk.sigma.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface UserService {

    Page<UsersResponse> findAll(Pageable pageable);

    UserResponseDto findById(Integer id);

    User findByEmail(String email);

    UsersResponse findUserByEmail(String email);

    SuccessResponse addUser(RegisterRequest user);

    SuccessResponse updateUser(UpdateUserRequest updateRequest, HttpServletRequest request);

    SuccessResponse updateUserAdmin(UpdateUserAdminRequest updateUserAdminRequest);

    SuccessResponse deleteUser(String email);
}
