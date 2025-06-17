package com.asesoria.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asesoria.models.BillsTypeModel;
import com.asesoria.models.RoleModel;
import com.asesoria.repositories.BillsTypeRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("/api/bills_type")
public class BillsTypeController {
	
	@Autowired
	BillsTypeRepository typeRepo;
	
	@GetMapping("/{id}")
	public ResponseEntity<String> getBillTypeById(@PathVariable int billTypeId) throws JsonProcessingException{
		Map<String, Object> rs = new HashMap<>(); 
		ObjectMapper om = new ObjectMapper();
		try {
			Optional<BillsTypeModel> billtype = typeRepo.findById(billTypeId);
			if (billtype.isPresent()) {
				rs.put("status", 200);
				rs.put("billtype", billtype.get());
				String json = om.writeValueAsString(rs);
				return ResponseEntity.ok(json);
			} else {
				rs.put("status", 404);
				rs.put("message", "Couldn't find the billtype with that id");
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
	
	@PostMapping("/post_types")
    public ResponseEntity<String> getTypes() {
        Map<String, Object> rs = new HashMap<>();
        ObjectMapper om = new ObjectMapper();

        try {
            List<BillsTypeModel> types = typeRepo.findAll();
            if (types.isEmpty()) {
                rs.put("status", 404);
                rs.put("mensaje", "No se obtuvo ningún tipo");
                rs.put("message", "No types found");
            } else {
                rs.put("status", 200);
                rs.put("mensaje", "Tipos recuperados con éxito.");
                rs.put("message", "Types retrieved successfully.");
                List<Map<String, Object>> typesJson = types.stream().map(type -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("value", type.getName());
                    return map;
                }).toList();
                rs.put("types", typesJson);
            }

            String json = om.writeValueAsString(rs);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            rs.put("status", 500);
            rs.put("mensaje", "Error interno del servidor al obtener los tipos");
            rs.put("message", "Internal Server error retrieving types");
            try {
                String json = om.writeValueAsString(rs);
                return ResponseEntity.status(500).body(json);
            } catch (Exception jsonEx) {
            	return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
            }
        }
    }
	
	@GetMapping("/testConnection")
	public ResponseEntity<String> testConnection() throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>();
		ObjectMapper om = new ObjectMapper();
		try {
			rs.put("status", 200);
			rs.put("message", "Hola desde el controlador de TipoFactura del Backend");
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
