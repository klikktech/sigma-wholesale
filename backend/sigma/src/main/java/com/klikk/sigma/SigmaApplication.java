package com.klikk.sigma;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication

public class SigmaApplication {

	@GetMapping("/")
	public String home(){
		return "Welcome, Mate!";
	}
	public static void main(String[] args) {

		SpringApplication.run(SigmaApplication.class, args);
	}
}
