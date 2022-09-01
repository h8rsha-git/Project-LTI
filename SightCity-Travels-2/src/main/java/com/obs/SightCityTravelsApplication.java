package com.obs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.obs.entity.Admin;

@SpringBootApplication
@ComponentScan("com.obs")
@EntityScan("com.obs")
@CrossOrigin("http://localhost:4200/")
public class SightCityTravelsApplication {
	
	public static void main(String[] args) {
		
		SpringApplication.run(SightCityTravelsApplication.class, args);
	}

}
