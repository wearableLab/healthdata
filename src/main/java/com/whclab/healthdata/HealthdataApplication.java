package com.whclab.healthdata;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@SpringBootApplication
@EnableJpaAuditing
public class HealthdataApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthdataApplication.class, args);
	}


}
