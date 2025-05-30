package com.asesoria.controllers;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asesoria.models.BillsTypeModel;
import com.asesoria.models.ClientesModel;
import com.asesoria.models.FacturaModel;
import com.asesoria.models.ProveedoresModel;
import com.asesoria.models.UsuariosModel;
import com.asesoria.repositories.FacturaRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Esta clase sirve como endpoint de la API /facturas, para la comunicación con esos datos
 */
@RestController
@RequestMapping("/api/facturas")
public class FacturaController {
	
	private FacturaRepository facturaRepo;
	
	@GetMapping("/{id}")
	public ResponseEntity<String> getFacturaById (@PathVariable long id) throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>(); 
		ObjectMapper om = new ObjectMapper();
		try {
			Optional<FacturaModel> factura = facturaRepo.findById(id);
			if (factura.isEmpty()) {
				rs.put("status", 404);
				rs.put("message", "Factura no encontrada");
			} else {
				rs.put("status", 200);
				rs.put("bill", factura.get());
			}
			String json = om.writeValueAsString(rs);
			return ResponseEntity.ok(json);
		} catch (Exception error) {
			rs.put("status", 500);
			rs.put("message", "Internal Server Error");
			String json = om.writeValueAsString(rs);
			return ResponseEntity.ok(json);
		}
	}
	
	@GetMapping("/{billType}")
	public String getFacturasByBillType(@PathVariable int billTypeId) throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>();
		ObjectMapper om = new ObjectMapper();
		try {
			BillsTypeModel billType = new BillsTypeModel();
			billType.setId(billTypeId);
			List<FacturaModel> facturas = facturaRepo.findByBillTypeId(billType);
			if(facturas.isEmpty()) {
				rs.put("status", 404);
				rs.put("message", "No se encontraron facturas de ese tipo");
			} else {
				rs.put("status", 200);
				rs.put("bills", facturas);
			}
			String json = om.writeValueAsString(rs);
			return json;
		} catch (Exception error) {
			rs.put("status", 500);
			rs.put("message", "Internal Server Error");
			String json = om.writeValueAsString(rs);
			return json;
		}
	}
	
	@GetMapping("/{clientId}")
	public String getFacturasByClientId(@PathVariable int clientId) throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>();
		ObjectMapper om = new ObjectMapper();
		try {
			ClientesModel cliente = new ClientesModel();
			cliente.setId(clientId);
			List<FacturaModel> facturas = facturaRepo.findByClientId(cliente);
			if(facturas.isEmpty()) {
				rs.put("status", 404);
				rs.put("message", "No se encontraron facturas de ese cliente");
			} else {
				rs.put("status", 200);
				rs.put("bills", facturas);
			}
			String json = om.writeValueAsString(rs);
			return json;
		} catch (Exception error) {
			rs.put("status", 500);
			rs.put("message", "Internal Server Error");
			String json = om.writeValueAsString(rs);
			return json;
		}
	}
	
	@GetMapping("/{providerId}")
	public String getFacturasByProviderId(@PathVariable int providerId) throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>();
		ObjectMapper om = new ObjectMapper();
		try {
			ProveedoresModel proveedor = new ProveedoresModel();
			proveedor.setId(providerId);
			List<FacturaModel> facturas = facturaRepo.findByProviderId(proveedor);
			if(facturas.isEmpty()) {
				rs.put("status", 404);
				rs.put("message", "No se encontraron facturas de ese proveedor");
			} else {
				rs.put("status", 200);
				rs.put("bills", facturas);
			}
			String json = om.writeValueAsString(rs);
			return json;
		} catch (Exception error) {
			rs.put("status", 500);
			rs.put("message", "Internal Server Error");
			String json = om.writeValueAsString(rs);
			return json;
		}
	}
	
	@GetMapping("/{startDate},{endDate}")
	public String getFacturasInTimeInterval(@PathVariable Timestamp startDate, @PathVariable Timestamp endDate) throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>();
		ObjectMapper om = new ObjectMapper();
		if (startDate instanceof Timestamp && endDate instanceof Timestamp) {
			try {
				Sort descSort = Sort.by(Sort.Direction.DESC, "validDate");
				List<FacturaModel> facturas = facturaRepo.findByValidDateBetween(startDate, endDate, descSort);
				if(facturas.isEmpty()) {
					rs.put("status", 404);
					rs.put("message", "No se encontraron facturas de ese proveedor");
				} else {
					rs.put("status", 200);
					rs.put("bills", facturas);
				}
				String json = om.writeValueAsString(rs);
				return json;
			} catch (Exception error) {
				rs.put("status", 500);
				rs.put("message", "Internal Server Error");
				String json = om.writeValueAsString(rs);
				return json;
			}
		} else {
			rs.put("status", 400);
			rs.put("message", "Bad Request");
			String json = om.writeValueAsString(rs);
			return json;
		}
	}
	
	// Este método dependerá del estilo de autenticación (firebase SpringSecurity, etc.)
	@GetMapping("/{userId}")
	public String getFacturasByUserId(@PathVariable long userId) throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>();
		ObjectMapper om = new ObjectMapper();
		try {
			List<FacturaModel> facturas = facturaRepo.findByUserIdAndValidDateIsNotNull(userId);
			if(facturas.isEmpty()) {
				rs.put("status", 404);
				rs.put("message", "No se encontraron facturas de ese proveedor");
			} else {
				rs.put("status", 200);
				rs.put("bills", facturas);
			}
			String json = om.writeValueAsString(rs);
			return json;
		} catch (Exception error) {
			rs.put("status", 500);
			rs.put("message", "Internal Server Error");
			String json = om.writeValueAsString(rs);
			return json;
		}
	} 
	
}
