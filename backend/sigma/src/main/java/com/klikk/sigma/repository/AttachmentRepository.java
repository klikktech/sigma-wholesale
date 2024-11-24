package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Attachment;
import com.klikk.sigma.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttachmentRepository extends JpaRepository<Attachment,String> {
    List<Attachment> findByProduct(Product product);
}
