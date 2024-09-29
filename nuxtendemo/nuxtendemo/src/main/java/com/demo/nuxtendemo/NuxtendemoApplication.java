package com.demo.nuxtendemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.builder.SpringApplicationBuilder;
//import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class NuxtendemoApplication
//		extends SpringBootServletInitializer
	{

	public static void main(String[] args) {
		SpringApplication.run(NuxtendemoApplication.class, args);
	}

//	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
//		return builder.sources(NuxtendemoApplication.class);
//	}
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*").allowedMethods("*").allowedHeaders("*");
			}
		};
	}
}
