package com.klikk.sigma.controller.admin;

import com.klikk.sigma.dto.request.CategoryRequest;
import com.klikk.sigma.dto.response.CategoryResponseDto;
import com.klikk.sigma.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/categories")
public class CategoryAdminController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping()
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put')")
    public ResponseEntity<String> addCategory(@RequestBody CategoryRequest categoryRequest){
        categoryService.saveCategory(categoryRequest);
        return ResponseEntity.ok("Category created");
    }

    @GetMapping("/search/{name}")
    @PreAuthorize("hasAnyAuthority('admin:read')")
    public List<CategoryResponseDto> searchCategories(@PathVariable  String name) {
        return categoryService.searchCategoriesByName(name);
    }

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('admin:read')")
    public ResponseEntity<List<CategoryResponseDto>> getAllCategories(){
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/pagination")
    @PreAuthorize("hasAnyAuthority('admin:read')")
    public ResponseEntity<Page<CategoryResponseDto>> getAllCategoriesWithPagination(Pageable pageable){
        return ResponseEntity.ok(categoryService.getAllCategoriesWithPagination(pageable));
    }

    @GetMapping("/{name}")
    @PreAuthorize("hasAnyAuthority('admin:read')")
    public ResponseEntity<CategoryResponseDto> getCategory(@PathVariable String name){
        return ResponseEntity.ok(categoryService.getCategory(name));
    }

    @DeleteMapping("/{name}")
    @PreAuthorize("hasAnyAuthority('admin:write','admin:put','admin:delete')")
    public ResponseEntity<String> deleteCategory(@PathVariable String name){
        categoryService.deleteCategory(name);
        return ResponseEntity.ok("Category deleted");
    }


}
