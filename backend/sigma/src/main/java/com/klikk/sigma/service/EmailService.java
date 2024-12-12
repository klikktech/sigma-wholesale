package com.klikk.sigma.service;

public interface EmailService {
    void sendResetPasswordEmail(String toEmail, String resetLink);
}
