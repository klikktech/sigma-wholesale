package com.klikk.sigma.controller;

import com.klikk.sigma.exception.NotFoundException;
import com.klikk.sigma.service.AddressService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @DeleteMapping()
    public ResponseEntity<String> deleteAddress(@RequestParam String address){
        try {
            addressService.deleteAddress(address);
        }
        catch (NotFoundException exception){
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch (Exception exception){
            return new ResponseEntity<>("Pass a valid address to delete", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("Address Deleted successfully!");
    }
}
