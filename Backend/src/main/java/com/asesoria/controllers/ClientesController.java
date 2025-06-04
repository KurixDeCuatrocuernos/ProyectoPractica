package com.asesoria.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asesoria.models.ClientesModel;
import com.asesoria.repositories.ClientesRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("/api/clientes")
public class ClientesController {
	
	ClientesRepository clientRepo;
	
	@GetMapping("/{id}")
	public ResponseEntity<String> getClientById(@PathVariable int clientId) throws JsonProcessingException{
		Map<String, Object> rs = new HashMap<>(); 
		ObjectMapper om = new ObjectMapper();
		try {
			Optional<ClientesModel> client = clientRepo.findById(clientId);
			if (client.isPresent()) {
				rs.put("status", 200);
				rs.put("client", client.get());
				String json = om.writeValueAsString(rs);
				return ResponseEntity.ok(json);
			} else {
				rs.put("status", 404);
				rs.put("message", "Couldn't find the client with that id");
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
	
	@GetMapping("/getClients")
	public ResponseEntity<String> getAllClients() throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>(); 
		ObjectMapper om = new ObjectMapper();
		try {
			List<ClientesModel> clients = clientRepo.findAll();
			if (clients.isEmpty()) {
				rs.put("status", 404);
				rs.put("message", "Couldn't find any client");
				String json = om.writeValueAsString(rs);
				return ResponseEntity.ok(json);
			} else {
				rs.put("status", 200);
				rs.put("clients", clients);
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
	
	@GetMapping("/testConnection")
	public ResponseEntity<String> testConnection() throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>();
		ObjectMapper om = new ObjectMapper();
		try {
			rs.put("status", 200);
			rs.put("message", "Hola desde el controlador de Clientes del Backend");
			String json = om.writeValueAsString(rs);
			return ResponseEntity.ok(json);
		} catch (Exception error) {
			rs.put("status", 500);
			rs.put("message", "Internal Server Error");
			String json = om.writeValueAsString(rs);
			return ResponseEntity.ok(json);
		}
	} 
	
}
