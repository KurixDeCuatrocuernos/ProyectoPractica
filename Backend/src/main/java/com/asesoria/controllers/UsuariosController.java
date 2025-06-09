package com.asesoria.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asesoria.models.UsuariosModel;
import com.asesoria.repositories.UsuariosRepository;
import com.asesoria.utils.Validator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("/api/usuarios")
public class UsuariosController {
	
	UsuariosRepository userRepo;

	Validator validator;
	
	@GetMapping("/checkAd/{id}")
	public ResponseEntity<String> checkAdminById(@PathVariable long id) throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>(); 
		ObjectMapper om = new ObjectMapper();
		try {
			int rol = userRepo.findRoleById(id);
			if (rol == 20) {
				rs.put("status", 200);
				rs.put("role", true);
				String json = om.writeValueAsString(rs);
				return ResponseEntity.ok(json);
			} else if (rol != 20) {
				rs.put("status", 200);
				rs.put("role", false);
				String json = om.writeValueAsString(rs);
				return ResponseEntity.ok(json);
			} else {
				rs.put("status", 404);
				rs.put("message", "Couldn't find the role of that user");
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
	
	@GetMapping("/checkUser/{id}")
	public ResponseEntity<String> checkUserById(@PathVariable long id) throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>(); 
		ObjectMapper om = new ObjectMapper();
		try {
			int rol = userRepo.findRoleById(id);
			if (rol == 10) {
				rs.put("status", 200);
				rs.put("role", true);
				String json = om.writeValueAsString(rs);
				return ResponseEntity.ok(json);
			} else if (rol != 10) {
				rs.put("status", 200);
				rs.put("role", false);
				String json = om.writeValueAsString(rs);
				return ResponseEntity.ok(json);
			} else {
				rs.put("status", 404);
				rs.put("message", "Couldn't find the role of that user");
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
	
	@GetMapping("/verifyUser/{id}")
	public ResponseEntity<String> verifyUserById(@PathVariable long id) throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>(); 
		ObjectMapper om = new ObjectMapper();
		try {
			int rol = userRepo.findConfirmedById(id);
			if (rol != 0) {
				rs.put("status", 200);
				rs.put("confirmed", true);
				String json = om.writeValueAsString(rs);
				return ResponseEntity.ok(json);
			} else if (rol == 0) {
				rs.put("status", 200);
				rs.put("confirmed", false);
				String json = om.writeValueAsString(rs);
				return ResponseEntity.ok(json);
			} else {
				rs.put("status", 404);
				rs.put("message", "Couldn't find the confirmed of that user");
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
	
	@PostMapping("/post/signup")
	public ResponseEntity<String> signUpUser(@RequestBody UsuariosModel user) throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>(); 
		ObjectMapper om = new ObjectMapper();
		try {
			if (user.getEmail() instanceof String && user.getName() instanceof String && user.getPassword() instanceof String) {
				// Sería mejor crear un util con cada validador
				String validatedEmail = validator.isValidEmail(user.getEmail());
				String validatedName = validator.isValidName(user.getName());
				String validatedPassword = validator.isValidPassword(user.getPassword());
				if (validatedEmail != null) {
					rs.put("status", 405);
					rs.put("message", validatedEmail);
					String json = om.writeValueAsString(rs);
					return ResponseEntity.ok(json);
				} else if (validatedName != null) {
					rs.put("status", 405);
					rs.put("message", validatedName);
					String json = om.writeValueAsString(rs);
					return ResponseEntity.ok(json);
				} else if (validatedPassword != null) {
					rs.put("status", 405);
					rs.put("message", validatedPassword);
					String json = om.writeValueAsString(rs);
					return ResponseEntity.ok(json);
				} else {
					user.setRole(10);
					userRepo.save(user);
					System.out.println(singInUser());
					rs.put("status", 200);
					rs.put("message", "Usuario registrado en la base de datos, a falta de confirmar su cuenta");
					String json = om.writeValueAsString(rs);
					return ResponseEntity.ok(json);
				}	
			} else {
				rs.put("status", 400);
				rs.put("message", "Bad Data Request");
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
	
	@PostMapping("/signin")
	public String singInUser() {
		return "Prueba del: Usuario Logueado con éxito";
	}
	
	@GetMapping("/testConnection")
	public ResponseEntity<String> testConnection() throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>();
		ObjectMapper om = new ObjectMapper();
		try {
			rs.put("status", 200);
			rs.put("message", "Hola desde el controlador de Usuarios del Backend");
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
