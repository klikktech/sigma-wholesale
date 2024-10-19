package com.klikk.sigma.controller;

import com.klikk.sigma.entity.Comment;
import com.klikk.sigma.entity.Review;
import com.klikk.sigma.service.impl.CommentServiceImpl;
import com.klikk.sigma.service.impl.ReviewServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewServiceImpl reviewServiceImpl;
    @PostMapping("/")
    public ResponseEntity<String> addReviews(@RequestBody Review review){
        reviewServiceImpl.addReview(review);
        return ResponseEntity.status(HttpStatus.CREATED).body("Added Review to the Product successfully");
    }
}
