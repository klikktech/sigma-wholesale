package com.klikk.sigma;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class SigmaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SigmaApplication.class, args);
	}

}
