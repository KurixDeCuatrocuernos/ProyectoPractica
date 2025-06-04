package com.asesoria.securities;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer{

	@Value("${frontend.url}")
	private String frontendUrl;
	
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permite solicitudes desde el puerto 5173 (frontend React)
        registry.addMapping("/*")
                .allowedOrigins(frontendUrl)  // Dirección del frontend (React)
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Métodos HTTP permitidos
                .allowedHeaders("")  // Permite cualquier encabezado
                .allowCredentials(true);
    }
    
}