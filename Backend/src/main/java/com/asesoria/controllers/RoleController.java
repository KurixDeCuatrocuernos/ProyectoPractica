package com.asesoria.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asesoria.models.RoleModel;
import com.asesoria.repositories.RoleRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/role")
public class RoleController {

	@Autowired
	RoleRepository roleRepo;
	
	@PostMapping("/post_roles")
    public ResponseEntity<String> getRoles() {
        Map<String, Object> rs = new HashMap<>();
        ObjectMapper om = new ObjectMapper();

        try {
            List<RoleModel> roles = roleRepo.findAll();
            if (roles.isEmpty()) {
                rs.put("status", 404);
                rs.put("mensaje", "No se obtuvo ningún rol");
                rs.put("message", "No roles found");
            } else {
                rs.put("status", 200);
                rs.put("mensaje", "Roles recuperados con éxito.");
                rs.put("message", "Roles retrieved successfully.");
                List<Map<String, Object>> rolesJson = roles.stream().map(role -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id",role.getId());
                    map.put("name", role.getName());
                    return map;
                }).toList();
                rs.put("roles", rolesJson);
            }

            String json = om.writeValueAsString(rs);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            rs.put("status", 500);
            rs.put("mensaje", "Error interno del servidor al obtener los roles");
            rs.put("message", "Internal Server error retrieving roles");
            try {
                String json = om.writeValueAsString(rs);
                return ResponseEntity.status(500).body(json);
            } catch (Exception jsonEx) {
            	return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
            }
        }
    }
	
	@PostMapping("/post_new_role")
    public ResponseEntity<String> postNewRole(@RequestBody RoleModel role) {
        Map<String, Object> rs = new HashMap<>();
        ObjectMapper om = new ObjectMapper();
        System.out.println("Role Recibido: "+role.toString());
        try {
        	if (role.getName() != null) {
        		if (role.getName().startsWith("ROLE_")) {
        			RoleModel newRole = new RoleModel();
        			newRole.setName(role.getName());
        			roleRepo.save(newRole);
        			Optional<RoleModel> savedRole = roleRepo.findByName(newRole.getName());
        			if (savedRole.isPresent()) {
        				rs.put("status", 200);
        				rs.put("id", savedRole.get().getId());
        			} else {
        				rs.put("status", 404);
                        rs.put("mensaje", "Rol insertado, pero no recuperado de la base de datos");
                        rs.put("message", "Role was inserted, but could not get from database");
        			}
        		} else {
           		 rs.put("status", 403);
                 rs.put("mensaje", "Nombre inválido para un rol");
                 rs.put("message", "Invalid role's name");
        		}
        	} else {
        		 rs.put("status", 400);
                 rs.put("mensaje", "No se ha recibido nombre para ese role");
                 rs.put("message", "Did not recieve name for that role");
        	}
            String json = om.writeValueAsString(rs);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            rs.put("status", 500);
            rs.put("mensaje", "Error interno del servidor al obtener los roles");
            rs.put("message", "Internal Server error retrieving roles");
            try {
                String json = om.writeValueAsString(rs);
                return ResponseEntity.status(500).body(json);
            } catch (Exception jsonEx) {
            	return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
            }
        }
    }

}
