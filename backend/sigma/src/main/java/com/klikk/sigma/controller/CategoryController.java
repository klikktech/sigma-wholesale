package com.klikk.sigma.controller;


import com.klikk.sigma.dto.request.CategoryRequest;
import com.klikk.sigma.dto.response.CategoryProductsDto;
import com.klikk.sigma.dto.response.CategoryResponseDto;
import com.klikk.sigma.entity.Category;
import com.klikk.sigma.service.impl.CategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryServiceImpl categoryServiceImpl;





    @GetMapping("/{name}/products")
    public ResponseEntity<Page<CategoryProductsDto>> getProductsOfCategory(@PathVariable String name, Pageable pageable){
            return ResponseEntity.ok(categoryServiceImpl.getProductsOfCategory(name, pageable));
    }

    @GetMapping("/tag/{name}/products")
    public ResponseEntity<Page<CategoryProductsDto>> getProductsOfTag(@PathVariable String name, Pageable pageable){
        return ResponseEntity.ok(categoryServiceImpl.getProductsOfTag(name, pageable));
    }



    @GetMapping("/{name}/childCategories")
    public ResponseEntity<List<CategoryResponseDto>> getChildCategories(@PathVariable String name){
        return ResponseEntity.ok(categoryServiceImpl.getChildCategories(name));
    }
}
