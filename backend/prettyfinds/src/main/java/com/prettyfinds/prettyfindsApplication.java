package com.prettyfinds;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class prettyfindsApplication {

	public static void main(String[] args) {
		SpringApplication.run(prettyfindsApplication.class, args);
	}

}