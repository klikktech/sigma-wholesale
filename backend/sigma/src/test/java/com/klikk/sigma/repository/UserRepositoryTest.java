package com.klikk.sigma.repository;

import com.klikk.sigma.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

//@DataJpaTest
@SpringBootTest
class UserRepositoryTest {

    @Autowired
    public UserRepository userRepository;
    @Test
    public void addUsers(){
//        User student=User.builder().email("pranav@gmail.com").username("PranavKaushik").address("2951 S king drive").type("user").firstName("Pranav")
//                .lastName("Dhara").phoneNumber("3124776452").passwordHash("6a54f64afdsdc").build();
//
//        userRepository.save(student);

    }
}