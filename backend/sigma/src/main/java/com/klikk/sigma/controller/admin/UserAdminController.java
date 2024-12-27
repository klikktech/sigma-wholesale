package com.klikk.sigma.controller.admin;

import com.klikk.sigma.dto.request.RegisterRequest;
import com.klikk.sigma.dto.request.UpdateUserAdminRequest;
import com.klikk.sigma.dto.request.UpdateUserRequest;
import com.klikk.sigma.dto.response.AuthenticationResponse;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.dto.response.UsersResponse;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.service.AuthenticationService;
import com.klikk.sigma.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/admin/users")
public class UserAdminController {


    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping()
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<Page<UsersResponse>> getUsers(Pageable pageable) {
        return ResponseEntity.ok(userService.findAll(pageable));
    }

    @PutMapping("/update")
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public ResponseEntity<SuccessResponse> updateUser(
            @RequestBody UpdateUserAdminRequest updateUserRequest) {
        try {
            SuccessResponse response = userService.updateUserAdmin(updateUserRequest);
            return ResponseEntity.ok(response);
        } catch (NotFoundException | IllegalArgumentException exception) {
            return new ResponseEntity<>(new SuccessResponse(LocalDateTime.now(), exception.getMessage()), HttpStatus.NOT_FOUND);
        }
        catch (Exception exception) {
            return new ResponseEntity<>(new SuccessResponse(LocalDateTime.now(), "Failed to update user"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{email}")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<?> getUserById(@PathVariable String email) {
        var result = userService.findUserByEmail(email);
        return ResponseEntity.ok(result);
    }


    @PostMapping("/register")
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @DeleteMapping("/{email}")
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put','admin:delete')")
    public ResponseEntity<SuccessResponse> deleteProduct(@PathVariable String email){
        return ResponseEntity.ok().body((userService.deleteUser(email)));
    }


}
