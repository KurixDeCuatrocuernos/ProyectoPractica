package com.asesoria.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asesoria.models.ProveedoresModel;
import com.asesoria.repositories.ProveedoresRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/proveedores")
public class ProveedoresController {

	ProveedoresRepository providerRepo;
	
	@GetMapping("/{id}")
	public ResponseEntity<String> getProveedorById(@PathVariable int providerId) throws JsonProcessingException{
		Map<String, Object> rs = new HashMap<>(); 
		ObjectMapper om = new ObjectMapper();
		try {
			Optional<ProveedoresModel> provider = providerRepo.findById(providerId);
			if (provider.isPresent()) {
				rs.put("status", 200);
				rs.put("proveedor", provider.get());
				String json = om.writeValueAsString(rs);
				return ResponseEntity.ok(json);
			} else {
				rs.put("status", 404);
				rs.put("message", "Couldn't find the provider with that id");
				String json = om.writeValueAsString(rs);
				return ResponseEntity.ok(json);
			}
		} catch (Exception error) {
			rs.put("status", 500);
			rs.put("message", "Internal Server error");
			String json = om.writeValueAsString(rs);
			return ResponseEntity.ok(json);
		}
	}
	
	@GetMapping("/getProveedores")
	public ResponseEntity<String> getAllProveedores() throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>(); 
		ObjectMapper om = new ObjectMapper();
		try {
			List<ProveedoresModel> proveedores = providerRepo.findAll();
			if (proveedores.isEmpty()) {
				rs.put("status", 404);
				rs.put("message", "Couldn't find any proveedor");
				String json = om.writeValueAsString(rs);
				return ResponseEntity.ok(json);
			} else {
				rs.put("status", 200);
				rs.put("proveedores", proveedores);
				String json = om.writeValueAsString(rs);
				return ResponseEntity.ok(json);
			}
		} catch (Exception error) {
			rs.put("status", 500);
			rs.put("message", "Internal Server Error");
			String json = om.writeValueAsString(rs);
			return ResponseEntity.ok(json);
		}
	}

}
