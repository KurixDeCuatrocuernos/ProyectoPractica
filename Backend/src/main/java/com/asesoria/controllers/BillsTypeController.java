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

import com.asesoria.models.BillsTypeModel;
import com.asesoria.repositories.BillsTypeRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("/api/bills_type")
public class BillsTypeController {
	
	BillsTypeRepository billTypeRepo;
	
	@GetMapping("/{id}")
	public ResponseEntity<String> getBillTypeById(@PathVariable int billTypeId) throws JsonProcessingException{
		Map<String, Object> rs = new HashMap<>(); 
		ObjectMapper om = new ObjectMapper();
		try {
			Optional<BillsTypeModel> billtype = billTypeRepo.findById(billTypeId);
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
	
	@GetMapping("/getBillsTypes")
	public ResponseEntity<String> getAllBillsTypes() throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>(); 
		ObjectMapper om = new ObjectMapper();
		try {
			List<BillsTypeModel> billsTypes = billTypeRepo.findAll();
			if (billsTypes.isEmpty()) {
				rs.put("status", 404);
				rs.put("message", "Couldn't find any billType");
				String json = om.writeValueAsString(rs);
				return ResponseEntity.ok(json);
			} else {
				rs.put("status", 200);
				rs.put("billstypes", billsTypes);
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
