package com.asesoria.controllers;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.AttributedString;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.asesoria.dto.FacturaProjection;
import com.asesoria.dto.UpdateUserProjection;
import com.asesoria.models.BillsTypeModel;
import com.asesoria.models.ClientesModel;
import com.asesoria.models.FacturaModel;
import com.asesoria.models.ProveedoresModel;
import com.asesoria.models.RoleModel;
import com.asesoria.models.UsuariosModel;
import com.asesoria.repositories.BillsTypeRepository;
import com.asesoria.repositories.FacturaRepository;
import com.asesoria.repositories.UsuariosRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

/**
 * Esta clase sirve como endpoint de la API /facturas, para la comunicación con esos datos
 */
@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("/api/facturas")
public class FacturaController {
	
	@Autowired
	FacturaRepository facturaRepo;
	
	/// Estas Funciones las podría/debería realizar el service de cada uno
	@Autowired
	UsuariosRepository userRepo;
	
	@Autowired
	BillsTypeRepository typeRepo;
	
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
	
	@GetMapping("/get_valid_bills") // Para obtener facturas que sí tienen validDate
    public ResponseEntity<String> getValidBills() {
        Map<String, Object> rs = new HashMap<>();
        ObjectMapper om = new ObjectMapper();

        try {
            List<FacturaModel> facturas = facturaRepo.findByValidDateIsNotNull();

            if (facturas.isEmpty()) {
                rs.put("status", 404);
                rs.put("mensaje", "No hay facturas validadas");
                rs.put("message", "No Invoids registered");
            } else {
                rs.put("status", 200);
                List<Map<String, Object>> billsJson = facturas.stream().map(factura -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("value", factura);
                    return map;
                }).toList();
                rs.put("facturas", billsJson);
            }
            
            String json = om.writeValueAsString(rs);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
        	 rs.put("status", 500);
             rs.put("mensaje", "Error interno del servidor al obtener las facturas");
             rs.put("message", "Internal Server error retrieving invoices");
             try {
                 String json = om.writeValueAsString(rs);
                 return ResponseEntity.status(500).body(json);
             } catch (Exception jsonEx) {
             	return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
             }
        }
    }
	
	@GetMapping("/get_bills") // Para obtener todas las facturas
    public ResponseEntity<String> getAllBills() {
        Map<String, Object> rs = new HashMap<>();
        ObjectMapper om = new ObjectMapper();

        try {
            List<FacturaProjection> facturas = facturaRepo.findAllFacturasProjected();

            if (facturas.isEmpty()) {
                rs.put("status", 404);
                rs.put("mensaje", "No hay facturas registradas");
                rs.put("message", "No Invoids registered");
            } else {
                rs.put("status", 200);
                List<Map<String, Object>> billsJson = facturas.stream().map(factura -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("value", factura);
                    return map;
                }).toList();
                rs.put("facturas", billsJson);
            }
            String json = om.writeValueAsString(rs);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
        	 rs.put("status", 500);
             rs.put("mensaje", "Error interno del servidor al obtener las facturas");
             rs.put("message", "Internal Server error retrieving invoices");
             try {
                 String json = om.writeValueAsString(rs);
                 return ResponseEntity.status(500).body(json);
             } catch (Exception jsonEx) {
             	return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
             }
        }
    }
	
	@GetMapping("/get_current_user_bills")
	public ResponseEntity<String> getCurrentUserBills(HttpServletRequest request) {
		Map<String, Object> rs = new HashMap<>();
        ObjectMapper om = new ObjectMapper();
        HttpSession session = request.getSession(false);
        
        try {
            List<FacturaProjection> facturas = facturaRepo.findFacturasByUserAndValidDate((long) session.getAttribute("id"));

            if (facturas.isEmpty()) {
                rs.put("status", 404);
                rs.put("mensaje", "No hay facturas registradas");
                rs.put("message", "No Invoids registered");
            } else {
                rs.put("status", 200);
                List<Map<String, Object>> billsJson = facturas.stream().map(factura -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("value", factura);
                    return map;
                }).toList();
                rs.put("facturas", billsJson);
            }
            String json = om.writeValueAsString(rs);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
        	 rs.put("status", 500);
             rs.put("mensaje", "Error interno del servidor al obtener las facturas");
             rs.put("message", "Internal Server error retrieving invoids");
             try {
                 String json = om.writeValueAsString(rs);
                 return ResponseEntity.status(500).body(json);
             } catch (Exception jsonEx) {
             	return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
             }
        }
    }
	
	@GetMapping("/get_saved_bills")
	public ResponseEntity<String> getSavedBills(HttpServletRequest request) {
		Map<String, Object> rs = new HashMap<>();
        ObjectMapper om = new ObjectMapper();
        HttpSession session = request.getSession(false);
        
        try {
            List<FacturaProjection> facturas = facturaRepo.findFacturasByUserAndValidDateNull((long) session.getAttribute("id"));

            if (facturas.isEmpty()) {
                rs.put("status", 404);
                rs.put("mensaje", "No hay facturas registradas");
                rs.put("message", "No Invoids registered");
            } else {
                rs.put("status", 200);
                List<Map<String, Object>> billsJson = facturas.stream().map(factura -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("value", factura);
                    return map;
                }).toList();
                rs.put("facturas", billsJson);
            }
            String json = om.writeValueAsString(rs);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
        	 rs.put("status", 500);
             rs.put("mensaje", "Error interno del servidor al obtener las facturas");
             rs.put("message", "Internal Server error retrieving invoids");
             try {
                 String json = om.writeValueAsString(rs);
                 return ResponseEntity.status(500).body(json);
             } catch (Exception jsonEx) {
             	return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
             }
        }
    }
	
	@PostMapping(value = "/post_new_bill", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> postNewBill(
	        @RequestParam("title") String title,
	        @RequestParam("type") int type,
	        @RequestParam("uploadDate") long uploadDateMillis,
	        @RequestParam("pdf") MultipartFile pdf, 
	        HttpServletRequest request) {

	    Map<String, Object> rs = new HashMap<>();
	    ObjectMapper om = new ObjectMapper();
	    HttpSession session = request.getSession(false);

	    try {
	        FacturaModel factura = new FacturaModel();
	        UsuariosModel user = new UsuariosModel();
	        user.setId((long) session.getAttribute("id"));
	        BillsTypeModel tipo = new BillsTypeModel();
	        tipo.setId(type);

	        factura.setTitle(title);
	        factura.setUploadDate(new Timestamp(uploadDateMillis));
	        factura.setBillTypeId(tipo); 
	        factura.setUserId(user);
	        factura.setPdf(pdf.getBytes());

	        System.out.println("Factura recibida: "+factura.toString());
	        
	        facturaRepo.save(factura);
	        
	        rs.put("status", 200);
	        rs.put("mensaje", "Factura subida correctamente");
	        rs.put("message", "Invoice uploaded successfully");

	        String json = om.writeValueAsString(rs);
	        return ResponseEntity.ok(json);
	    } catch (Exception e) {
	        rs.put("status", 500);
	        rs.put("mensaje", "Error al procesar la factura");
	        rs.put("message", "Error processing invoice");

	        try {
	            String json = om.writeValueAsString(rs);
	            return ResponseEntity.status(500).body(json);
	        } catch (Exception jsonEx) {
	            return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
	        }
	    }
	}
	
	@PostMapping("/post_deletion")
    public ResponseEntity<String> eliminarFactura(@RequestBody Long id) {
        Map<String, Object> rs = new HashMap<>();
        ObjectMapper om = new ObjectMapper();
        try {
        	Optional<FacturaModel> facturaOpt = facturaRepo.findById(id);

            if (facturaOpt.isPresent()) {
                facturaRepo.deleteById(id);
                rs.put("status", 200);
                rs.put("mensaje", "Factura eliminada correctamente");
                rs.put("message", "Invoid successfully deleted");
            } else {
                rs.put("status", 404);
                rs.put("mensaje", "Factura no encontrada");
                rs.put("message", "Invoid not found");
            }
            String json = om.writeValueAsString(rs);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
        	rs.put("status", 500);
	        rs.put("mensaje", "Error al procesar la factura");
	        rs.put("message", "Error processing invoice");
	        try {
	            String json = om.writeValueAsString(rs);
	            return ResponseEntity.status(500).body(json);
	        } catch (Exception jsonEx) {
	            return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
	        }
        }
    }
	
	@Transactional
	@PutMapping("/put_submit_bill")
	public ResponseEntity<String> publicInvoid(@RequestBody Long id) {
        Map<String, Object> rs = new HashMap<>();
        ObjectMapper om = new ObjectMapper();
        try {

            if (id != null) {
            	
            	Timestamp date = Timestamp.valueOf(LocalDateTime.now());
            	facturaRepo.updateValidDateById(id, date);
            	
            	rs.put("status", 200);
                rs.put("mensaje", "Factura publicada con éxito");
                rs.put("message", "Invoid successfully submit");
            } else {
                rs.put("status", 404);
                rs.put("mensaje", "Factura no encontrada");
                rs.put("message", "Invoid not found");
            }
            String json = om.writeValueAsString(rs);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
        	rs.put("status", 500);
	        rs.put("mensaje", "Error al procesar la factura");
	        rs.put("message", "Error processing invoice");
	        try {
	            String json = om.writeValueAsString(rs);
	            return ResponseEntity.status(500).body(json);
	        } catch (Exception jsonEx) {
	            return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
	        }
        }
    }
	
	@PostMapping(value = "/post_save_and_submit_bill", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> postSaveAndSubmitBill(
	        @RequestParam("title") String title,
	        @RequestParam("type") int type,
	        @RequestParam("uploadDate") long uploadDateMillis,
	        @RequestParam("pdf") MultipartFile pdf, 
	        HttpServletRequest request) {

	    Map<String, Object> rs = new HashMap<>();
	    ObjectMapper om = new ObjectMapper();
	    HttpSession session = request.getSession(false);

	    try {
	        FacturaModel factura = new FacturaModel();
	        UsuariosModel user = new UsuariosModel();
	        user.setId((long) session.getAttribute("id"));
	        BillsTypeModel tipo = new BillsTypeModel();
	        tipo.setId(type);

	        factura.setTitle(title);
	        factura.setUploadDate(new Timestamp(uploadDateMillis));
	        factura.setBillTypeId(tipo); 
	        factura.setUserId(user);
	        factura.setPdf(pdf.getBytes());
	        
	        Timestamp date = Timestamp.valueOf(LocalDateTime.now());
	        factura.setValidDate(date);
	        
	        facturaRepo.save(factura);
	        
	        rs.put("status", 200);
	        rs.put("mensaje", "Factura subida correctamente");
	        rs.put("message", "Invoice uploaded successfully");

	        String json = om.writeValueAsString(rs);
	        return ResponseEntity.ok(json);
	    } catch (Exception e) {
	        rs.put("status", 500);
	        rs.put("mensaje", "Error al procesar la factura");
	        rs.put("message", "Error processing invoice");

	        try {
	            String json = om.writeValueAsString(rs);
	            return ResponseEntity.status(500).body(json);
	        } catch (Exception jsonEx) {
	            return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
	        }
	    }
	}
	
	@Transactional
	@PostMapping(value="/post_update_bill_data", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> postUpdateBill(
			@RequestParam("id") Long id,
			@RequestParam(value = "title", required = false) String title,
			@RequestParam(value = "type", required = false) int type,
			@RequestParam(value = "uploadDate", required = false) Long uploadDateMillis,
			@RequestParam(value = "pdf", required = false) MultipartFile pdf,
	        HttpServletRequest request) {
       Map<String, Object> rs = new HashMap<>();
       ObjectMapper om = new ObjectMapper();
       try {
    	   if (id != null) {
    		  
    		   if (title != null) facturaRepo.updateTitleById(id, title);
    		   if (uploadDateMillis != null) facturaRepo.updateUploadDateById(id, new Timestamp(uploadDateMillis));
               if (pdf != null) facturaRepo.updatePdfById(id, pdf.getBytes());
               if (type != 0) {
            	   BillsTypeModel billType = new BillsTypeModel();
            	   billType.setId(type);
            	   facturaRepo.updateTypeById(id, billType);
               }
               rs.put("status", 200);
               rs.put("mensaje", "Usuario actualizado correctamente");
               rs.put("message", "User updated successfully");
    	   } else {
    		   rs.put("status", 400);
    		   rs.put("mensaje", "ID de usuario no recibido");
    		   rs.put("message", "User ID is missing");
    	   }
            
           String json = om.writeValueAsString(rs);
           return ResponseEntity.ok(json);
       } catch (Exception e) {
    	   rs.put("status", 500);
    	   rs.put("mensaje", "Error interno del servidor: "+e);
    	   rs.put("message", "Internal Server error: "+e);
    	   try {
               String json = om.writeValueAsString(rs);
               return ResponseEntity.ok(json);
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
			rs.put("message", "Hola desde el controlador de Facturas del Backend");
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
