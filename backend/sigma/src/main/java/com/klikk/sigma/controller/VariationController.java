package com.klikk.sigma.controller;

import com.klikk.sigma.dto.VariationDto;
import com.klikk.sigma.service.VariationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/variations")
public class VariationController {

    @Autowired
    private VariationService variationService;

    @PostMapping("/")
    public ResponseEntity<String> addVariation(@RequestBody VariationDto variation) {
        try {
            variationService.saveVariation(variation); // Save the variation
            return ResponseEntity.ok("Variation added successfully");
        } catch (Exception exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
