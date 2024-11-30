package com.klikk.sigma.controller;

import com.klikk.sigma.dto.UserResponseDto;
import com.klikk.sigma.dto.request.RegisterRequest;
import com.klikk.sigma.dto.request.UpdateUserRequest;
import com.klikk.sigma.dto.response.AddressResponseDto;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.dto.response.UsersResponse;
import com.klikk.sigma.entity.Address;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.mapper.AddressMapper;
import com.klikk.sigma.service.JwtService;
import com.klikk.sigma.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AddressMapper addressMapper;

    @GetMapping("/details")
//    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<UsersResponse> getUserById(HttpServletRequest request) {
        try {

            String token=request.getHeader("Authorization").split(" ")[1];
            String email=jwtService.extractUsername(token);

            var result = userService.findUserByEmail(email);
            return ResponseEntity.of(Optional.of(result));
        } catch (NotFoundException exception) {
            return new ResponseEntity(exception.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception exception) {
            return new ResponseEntity(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("/addresses")
    public ResponseEntity<List<AddressResponseDto>> getAddresses(
            @RequestParam("type") String addressType,
            HttpServletRequest request) {
        String token= request.getHeader("Authorization").split(" ")[1];
        String userEmail = jwtService.extractUsername(token);
        User user=userService.findByEmail(userEmail);
        List<Address> addresses;
        switch (addressType.toLowerCase()) {
            case "store":
                addresses = user.getStoreAddress();
                break;
            case "shipping":
                addresses = user.getShippingAddress();
                break;
            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid address type");
        }

        return ResponseEntity.ok(addresses.stream().map(address -> {
            AddressResponseDto newAddress=addressMapper.addressToAddressResponseDto(address);
            newAddress.setFirstName(user.getFirstname());
            newAddress.setLastName(user.getLastname());
            newAddress.setPhone(user.getPhone());
            return newAddress;
        }).toList());
    }




    @PostMapping()
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<SuccessResponse> addUser(@RequestBody RegisterRequest user) {
        return ResponseEntity.ok(userService.addUser(user));
    }

    @PutMapping("/update")
    public ResponseEntity<SuccessResponse> updateUser(
            @RequestBody UpdateUserRequest updateUserRequest,
            HttpServletRequest request) {
        try {
            SuccessResponse response = userService.updateUser(updateUserRequest, request);
            return ResponseEntity.ok(response);
        } catch (NotFoundException | IllegalArgumentException exception) {
            return new ResponseEntity<>(new SuccessResponse(LocalDateTime.now(), exception.getMessage()), HttpStatus.NOT_FOUND);
        }
        catch (Exception exception) {
            return new ResponseEntity<>(new SuccessResponse(LocalDateTime.now(), "Failed to update user"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
