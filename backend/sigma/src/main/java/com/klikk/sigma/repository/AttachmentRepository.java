package com.klikk.sigma.repository;

import com.klikk.sigma.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepository extends JpaRepository<Attachment,String> {
}