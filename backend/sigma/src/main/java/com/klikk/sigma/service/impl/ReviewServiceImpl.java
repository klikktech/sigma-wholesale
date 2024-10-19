package com.klikk.sigma.service.impl;

import com.klikk.sigma.entity.Product;
import com.klikk.sigma.entity.Review;
import com.klikk.sigma.repository.ProductRepository;
import com.klikk.sigma.repository.ReviewRepository;
import com.klikk.sigma.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;
    @Override
    public void addReview(Review review) {
//        Optional<Product> linkedProduct=productRepository.findById(review.getId());
//        linkedProduct.ifPresent(review::setProduct);
        reviewRepository.save(review);
    }
}
