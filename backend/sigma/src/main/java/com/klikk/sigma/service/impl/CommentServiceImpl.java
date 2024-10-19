package com.klikk.sigma.service.impl;

import com.klikk.sigma.entity.Comment;
import com.klikk.sigma.entity.Order;
import com.klikk.sigma.entity.Product;
import com.klikk.sigma.repository.CommentRepository;
import com.klikk.sigma.repository.OrderRepository;
import com.klikk.sigma.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private OrderRepository orderRepository;
    @Override
    public void addComment(Comment comment) {
        Optional<Order> linkedOrder=orderRepository.findByOrderId(comment.getOrderId());
        linkedOrder.ifPresent(comment::setOrder);
        commentRepository.save(comment);
    }
}
