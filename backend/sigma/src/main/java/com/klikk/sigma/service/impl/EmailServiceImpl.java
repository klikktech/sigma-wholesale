package com.klikk.sigma.service.impl;

import com.klikk.sigma.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmailId;

    @Value("${spring.mail.display-name}")
    private String displayName;

    @Override
    public void sendResetPasswordEmail(String toEmail, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(displayName + " <" + fromEmailId + ">");
        message.setTo(toEmail);
        message.setSubject("Password Reset Request");
        message.setText("Dear User,\n\n" +
                "We received a request to reset your password. Please use the code below to reset your password:\n\n" +
                "Reset Code: " + token + "\n" +
                "If you did not request this, you can safely ignore this email.\n\n" +
                "Thank you,\n" +
                "Sigma Wholesale Team");

        mailSender.send(message);
    }
}
