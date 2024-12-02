package com.klikk.sigma.controller;

import com.klikk.sigma.dto.VariationDto;
import com.klikk.sigma.service.VariationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/variations")
public class VariationController {

    @Autowired
    private VariationService variationService;

    @PostMapping("/{details}")
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public ResponseEntity<String> addVariation(@RequestBody VariationDto variation, @PathVariable String details) {
            variationService.saveVariation(variation,details); // Save the variation
            return ResponseEntity.ok("Variation added successfully");

    }
}
