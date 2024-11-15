package com.klikk.sigma.controller;

import com.klikk.sigma.dto.UserResponseDto;
import com.klikk.sigma.dto.request.RegisterRequest;
import com.klikk.sigma.dto.response.SuccessResponse;
import com.klikk.sigma.dto.response.UsersResponse;
import com.klikk.sigma.entity.Address;
import com.klikk.sigma.entity.User;
import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private UserService userService;

//    @GetMapping("/{id}")
//    @PreAuthorize("hasAuthority('admin:read')")
//    public ResponseEntity<UserResponseDto> getUserById(@PathVariable("id") int id) {
//        try {
//            var result = userService.findById(id);
//            return ResponseEntity.of(Optional.of(result));
//        } catch (NotFoundException exception) {
//            return new ResponseEntity(exception.getMessage(), HttpStatus.NOT_FOUND);
//        } catch (Exception exception) {
//            return new ResponseEntity(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @GetMapping()
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<List<UsersResponse>> getUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{email}/StoreAddress")
    public ResponseEntity<List<Address>> getStoreAddresses(@PathVariable String email){
        return ResponseEntity.ok(userService.findByEmail(email).getStoreAddress());
    }

    @GetMapping("/{email}/addresses")
    public ResponseEntity<List<Address>> getAddresses(
            @PathVariable String email,
            @RequestParam("type") String addressType) {

        User user = userService.findByEmail(email);

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

        return ResponseEntity.ok(addresses);
    }


    @PostMapping()
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<SuccessResponse> addUser(@RequestBody RegisterRequest user) {
        return ResponseEntity.ok(userService.addUser(user));
    }
}
