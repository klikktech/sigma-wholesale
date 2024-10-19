package com.klikk.sigma.controller;

import com.klikk.sigma.entity.Comment;
import com.klikk.sigma.service.impl.CommentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentServiceImpl commentServiceImpl;
    @PostMapping("/")
    public ResponseEntity<String> addReviews(@RequestBody Comment comment){
        commentServiceImpl.addComment(comment);
        return ResponseEntity.status(HttpStatus.CREATED).body("Added Comment to the Order successfully");
    }
}