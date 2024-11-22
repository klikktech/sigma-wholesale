package com.klikk.sigma.controller.admin;

import com.klikk.sigma.dto.request.UpdateUserAdminRequest;
import com.klikk.sigma.dto.request.UpdateUserRequest;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/admin/users")
public class UserAdminController {


    @Autowired
    private UserService userService;

    @PutMapping("/update")
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public ResponseEntity<SuccessResponse> updateUser(
            @RequestBody UpdateUserAdminRequest updateUserRequest,
            HttpServletRequest request) {
        try {
            SuccessResponse response = userService.updateUserAdmin(updateUserRequest, request);
            return ResponseEntity.ok(response);
        } catch (NotFoundException | IllegalArgumentException exception) {
            return new ResponseEntity<>(new SuccessResponse(LocalDateTime.now(), exception.getMessage()), HttpStatus.NOT_FOUND);
        }
        catch (Exception exception) {
            return new ResponseEntity<>(new SuccessResponse(LocalDateTime.now(), "Failed to update user"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
