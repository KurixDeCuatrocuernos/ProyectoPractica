package com.asesoria.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asesoria.dto.UsuariosProjection;
import com.asesoria.models.UsuariosModel;
import com.asesoria.repositories.UsuariosRepository;
import com.asesoria.utils.Validator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("/api/usuarios")
public class UsuariosController {
	
	@Autowired
	UsuariosRepository userRepo;
	
	@Autowired
	Validator validator;
	
	/**
	 * Checks if a user identified by their ID has an administrator role.
	 * This endpoint queries the database for the user's role and returns a boolean indicating
	 * if they are an administrator (role 20).
	 *
	 * @param id The unique identifier of the user whose role is to be checked.
	 * @return A {@link org.springframework.http.ResponseEntity} containing a JSON string.
	 * The JSON includes:
	 * <ul>
	 * <li>{@code status}: HTTP status code (e.g., 200 for success, 500 for internal errors).</li>
	 * <li>{@code role}: A boolean indicating if the user has the admin role ({@code true} if role is 20, {@code false} otherwise).</li>
	 * <li>{@code message}: (Optional) A descriptive message, typically for error scenarios.</li>
	 * </ul>
	 * Example successful response for an admin: {@code {"status": 200, "role": true}}
	 * Example successful response for a non-admin: {@code {"status": 200, "role": false}}
	 * Example error response: {@code {"status": 500, "message": "Internal Server error"}}
	 */
	@GetMapping("/checkAd/{id}")
	public ResponseEntity<String> checkAdminById(@PathVariable long id) throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>(); 
		ObjectMapper om = new ObjectMapper();
		try {
			int rol = userRepo.findRoleById(id);
			if (rol == 20) {
				rs.put("status", 200);
				rs.put("role", true);
			} else if (rol != 20) {
				rs.put("status", 200);
				rs.put("role", false);
			} else {
				rs.put("status", 404);
				rs.put("message", "Couldn't find the role of that user");
			}
			String json = om.writeValueAsString(rs);
			return ResponseEntity.ok(json);
		} catch (Exception error) {
			rs.put("status", 500);
			rs.put("message", "Internal Server error");
			try {
                String json = om.writeValueAsString(rs);
                return ResponseEntity.ok(json);
            } catch (Exception jsonEx) {
                return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
            }
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
			} else if (rol != 10) {
				rs.put("status", 200);
				rs.put("role", false);
			} else {
				rs.put("status", 404);
				rs.put("message", "Couldn't find the role of that user");
			}
			String json = om.writeValueAsString(rs);
			return ResponseEntity.ok(json);
		} catch (Exception error) {
			rs.put("status", 500);
			rs.put("message", "Internal Server error");
			try {
                String json = om.writeValueAsString(rs);
                return ResponseEntity.ok(json);
            } catch (Exception jsonEx) {
                return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
            }
		}
	}
	
	/**
	 * Checks if a user identified by their ID has a specific standard user role (role 10).
	 * This endpoint queries the database for the user's role and returns a boolean indicating
	 * if they possess the specified role.
	 *
	 * @param id The unique identifier of the user whose role is to be checked.
	 * @return A {@link org.springframework.http.ResponseEntity} containing a JSON string.
	 * The JSON includes:
	 * <ul>
	 * <li>{@code status}: HTTP status code (e.g., 200 for success, 500 for internal errors).</li>
	 * <li>{@code role}: A boolean indicating if the user has the standard role ({@code true} if role is 10, {@code false} otherwise).</li>
	 * <li>{@code message}: (Optional) A descriptive message, primarily for error scenarios.</li>
	 * </ul>
	 * Example successful response for a user with role 10: {@code {"status": 200, "role": true}}
	 * Example successful response for a user with a different role: {@code {"status": 200, "role": false}}
	 * Example error response: {@code {"status": 500, "message": "Internal Server error"}}
	 */
	@GetMapping("/verifyUser/{id}")
	public ResponseEntity<String> verifyUserById(@PathVariable long id) throws JsonProcessingException {
		Map<String, Object> rs = new HashMap<>(); 
		ObjectMapper om = new ObjectMapper();
		try {
			int rol = userRepo.findConfirmedById(id);
			if (rol != 0) {
				rs.put("status", 200);
				rs.put("confirmed", true);
			} else if (rol == 0) {
				rs.put("status", 200);
				rs.put("confirmed", false);
			} else {
				rs.put("status", 404);
				rs.put("message", "Couldn't find the confirmed of that user");
			}
			String json = om.writeValueAsString(rs);
			return ResponseEntity.ok(json);
		} catch (Exception error) {
			rs.put("status", 500);
			rs.put("message", "Internal Server error");
			try {
                String json = om.writeValueAsString(rs);
                return ResponseEntity.ok(json);
            } catch (Exception jsonEx) {
                return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
            }
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
				} else if (validatedName != null) {
					rs.put("status", 405);
					rs.put("message", validatedName);
				} else if (validatedPassword != null) {
					rs.put("status", 405);
					rs.put("message", validatedPassword);
				} else {
					user.setRole(10);
					userRepo.save(user);
					rs.put("status", 200);
					rs.put("message", "Usuario registrado en la base de datos, a falta de confirmar su cuenta");
				}	
			} else {
				rs.put("status", 400);
				rs.put("message", "Bad Data Request");
			}
			String json = om.writeValueAsString(rs);
			return ResponseEntity.ok(json);
		} catch (Exception error) {
			rs.put("status", 500);
			rs.put("message", "Internal Server error");
			try {
                String json = om.writeValueAsString(rs);
                return ResponseEntity.ok(json);
            } catch (Exception jsonEx) {
                return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
            }
		}
	}
	
	/**
	 * Handles the user registration process.
	 * This endpoint receives user details (email, name, password), validates them,
	 * and if valid, saves the new user to the database with a default role of 10.
	 *
	 * @param user The {@link UsuariosModel} object containing the user's registration data (email, name, password).
	 * @return A {@link org.springframework.http.ResponseEntity} containing a JSON string.
	 * The JSON includes:
	 * <ul>
	 * <li>{@code status}: HTTP status code (e.g., 200 for success, 405 for validation errors, 400 for bad data, 500 for internal server errors).</li>
	 * <li>{@code message}: A descriptive message about the outcome, including validation error details if applicable.</li>
	 * </ul>
	 * Example successful response: {@code {"status": 200, "message": "Usuario registrado en la base de datos, a falta de confirmar su cuenta"}}
	 * Example validation error response: {@code {"status": 405, "message": "Invalid email format"}}
	 * Example bad data request: {@code {"status": 400, "message": "Bad Data Request"}}
	 * Example internal error response: {@code {"status": 500, "message": "Internal Server error"}}
	 */
	@PostMapping("/signin")
	public ResponseEntity<String> singInUser(@RequestBody UsuariosModel user, HttpServletRequest request) {
		System.out.println("Han llegado los datos del front: "+user.getEmail()+" & "+user.getPassword());
		Map<String, Object> rs = new HashMap<>(); 
		ObjectMapper om = new ObjectMapper();
		try {
			if (user.getEmail() instanceof String && user.getPassword() instanceof String) {
				String validatedEmail = validator.isValidEmail(user.getEmail());
				String validatedPassword = validator.isValidPassword(user.getPassword());
				System.out.println("Ha pasado por el validador");
				if (validatedEmail != null) {
					rs.put("status", 405);
					rs.put("message", validatedEmail);
				} else if (validatedPassword != null) {
					rs.put("status", 405);
					rs.put("message", validatedPassword);
				} else {
					Optional<UsuariosModel> userData = userRepo.findByEmail(user.getEmail());
					if (userData.isPresent()) {
						System.out.println("Datos de la base de datos: "+userData.get().toString());
						if (userData.get().getEmail().equals(user.getEmail()) && userData.get().getPassword().equals(user.getPassword())) {
							HttpSession session = request.getSession(true);
							session.setAttribute("email", user.getEmail());
							session.setAttribute("id", userData.get().getId());
							session.setAttribute("role", userData.get().getRole());
							session.setAttribute("name", userData.get().getName());
							rs.put("status", 200);
							rs.put("mensaje", "¡Usuario logueado con éxito!");
							rs.put("message", "User login successful!");
						} else {
							rs.put("status", 403);
							rs.put("mensaje", "Esa combinación de email y contraseña es incorrecta");
							rs.put("message", "That email and password combination is incorrect");
						}
					} else {
						rs.put("status", 401);
						rs.put("mensaje", "Esa combinación de email y contraseña es incorrecta");
						rs.put("message", "That email and password combination is incorrect");
					}
				}	
			} else {
				rs.put("status", 400);
				rs.put("message", "Bad Data Request");
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
	
	
	/**
	 * Checks the current user's session to determine if they are logged in and their role.
	 * This endpoint is typically used by the front-end to verify authentication status
	 * and user permissions upon page load or before accessing protected resources.
	 *
	 * @param request The {@link jakarta.servlet.http.HttpServletRequest} object,
	 * used to retrieve the current user's session.
	 * @return A {@link org.springframework.http.ResponseEntity} containing a JSON string.
	 * The JSON includes a {@code status} field indicating the outcome:
	 * <ul>
	 * <li>{@code 200}: User is logged in and has the required role (e.g., "10").</li>
	 * <li>{@code 403}: User is not logged in, or does not have the required role, or the role attribute is missing.</li>
	 * <li>{@code 500}: An internal server error occurred during the check.</li>
	 * </ul>
	 * Example successful response: {@code {"status": 200}}
	 * Example forbidden response: {@code {"status": 403}}
	 * Example error response: {@code {"status": 500, "mensaje": "Error interno del servidor...", "message": "Internal Server Error"}}
	 */
	@GetMapping("/check_user") // HAY QUE CAMBIARLO A POST
	public ResponseEntity<String> checkUser(HttpServletRequest request) {
		Map<String, Object> rs = new HashMap<>();
		ObjectMapper om = new ObjectMapper();
		try {
			HttpSession session = request.getSession(false);
			if (session != null) {
				String role = session.getAttribute("role").toString();
				if (role != null) {
					if (role.equals("10")) {
						rs.put("status", 200);
					} else  {
						rs.put("status", 403);
					}
				} else {
					rs.put("status", 403);
				}
			} else {
				rs.put("status", 403);
			}
			String json = om.writeValueAsString(rs);
			return ResponseEntity.ok(json);
		} catch (Exception e) {
			rs.put("status", 500);
			rs.put("mensaje", "Error interno del servidor: "+e);
			rs.put("message", "Internal Server Error");
			try {
                String json = om.writeValueAsString(rs);
                return ResponseEntity.ok(json);
            } catch (Exception jsonEx) {
                return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
            }
		}
	}
	
	@PostMapping("/check_log")
	public ResponseEntity<String> checkLog(HttpServletRequest request) {
		Map<String, Object> rs = new HashMap<>();
		ObjectMapper om = new ObjectMapper();
		try {
			HttpSession session = request.getSession(false);
			if (session != null) {
				rs.put("status", 200);
				rs.put("log", true);
				rs.put("name", session.getAttribute("name"));
			} else {
				rs.put("status", 403);
				rs.put("log", false);
			}
			 String json = om.writeValueAsString(rs);
             return ResponseEntity.ok(json);
		} catch (Exception e) {
			rs.put("status", 500);
			rs.put("mensaje", "Error interno del servidor: "+e);
			rs.put("message", "Internal Server Error");
			try {
                String json = om.writeValueAsString(rs);
                return ResponseEntity.ok(json);
            } catch (Exception jsonEx) {
                return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
            }
		}
	}
	
	/**
	 * Handles user logout by invalidating the current HTTP session.
	 * If a session exists, it's closed and a success message is returned.
	 * If no active session is found, a specific message indicating this is returned.
	 *
	 * @param request The {@link jakarta.servlet.http.HttpServletRequest} object,
	 * used to retrieve the current user's session.
	 * @return A {@link org.springframework.http.ResponseEntity} containing a JSON string.
	 * The JSON includes:
	 * - {@code status}: HTTP status code (e.g., 200 for success, 400 if no active session, 500 for internal errors).
	 * - {@code mensaje} (Spanish) / {@code message} (English): A description of the operation's outcome.
	 * Example successful response: {@code {"status": 200, "mensaje": "¡Sesión cerrada con éxito!", "message": "Session logged out successfully!"}}
	 * Example no active session response: {@code {"status": 400, "mensaje": "No hay sesión activa para cerrar.", "message": "No active session to log out."}}
	 * Example error response: {@code {"status": 500, "mensaje": "Error interno del servidor...", "message": "Internal Server error..."}}
	 */
	@PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpServletRequest request) {
        Map<String, Object> rs = new HashMap<>();
        ObjectMapper om = new ObjectMapper();
        try {
            HttpSession session = request.getSession(false);

            if (session != null) {
                session.invalidate(); //cerrar la sesión
                System.out.println("Sesión invalidada para el usuario.");
                rs.put("status", 200);
                rs.put("mensaje", "¡Sesión cerrada con éxito!");
                rs.put("message", "Session logged out successfully!");
            } else {
               
                rs.put("status", 400); // Bad Request 
                rs.put("mensaje", "No hay sesión activa para cerrar.");
                rs.put("message", "No active session to log out.");
            }
            String json = om.writeValueAsString(rs);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            rs.put("status", 500);
            rs.put("mensaje", "Error interno del servidor al cerrar la sesión: " + e.getMessage());
            rs.put("message", "Internal Server error during logout: " + e.getMessage());
            try {
                String json = om.writeValueAsString(rs);
                return ResponseEntity.ok(json);
            } catch (Exception jsonEx) {
                return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
            }
        }
    }
	
	/**
	 * Obtiene los datos del usuario actual basado en la sesión activa.
	 * 
	 * <p>Este método recibe una solicitud HTTP y busca el usuario en la base de datos
	 * utilizando el ID almacenado en la sesión. Si el usuario existe, devuelve sus datos
	 * en formato JSON. Si no se encuentra, devuelve un mensaje de error.</p>
	 * 
	 * @param request La solicitud HTTP que contiene la sesión del usuario.
	 * @return ResponseEntity con un JSON que contiene el estado de la respuesta y los datos del usuario si existe.
	 *         - {@code 200} si el usuario se encuentra correctamente.
	 *         - {@code 404} si el usuario no está en la sesión.
	 *         - {@code 500} si ocurre un error interno del servidor.
	 */
	@PostMapping("/get_current_data")
	public ResponseEntity<String> getCurrentData(HttpServletRequest request) {
		Map<String, Object> rs = new HashMap<>();
        ObjectMapper om = new ObjectMapper();
		try {		
			HttpSession session = request.getSession(false);
			Optional<UsuariosProjection> currentUser = userRepo.findUserWithoutSensitiveData((long) session.getAttribute("id"));
			if (currentUser.isPresent()) {
				rs.put("status", 200);
	            rs.put("user", currentUser.get());
			} else {
				rs.put("status", 404);
	            rs.put("mensaje", "No se ha encontrado al usuario en la sesión actual.");
	            rs.put("message", "Could not find the current session's user");
			}
			 String json = om.writeValueAsString(rs);
             return ResponseEntity.ok(json);
		} catch (Exception e) {
			rs.put("status", 500);
            rs.put("mensaje", "Error interno del servidor al cerrar la sesión: " + e.getMessage());
            rs.put("message", "Internal Server error during logout: " + e.getMessage());
            try {
                String json = om.writeValueAsString(rs);
                return ResponseEntity.ok(json);
            } catch (Exception jsonEx) {
                return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
            }
		}
	}
	
	@GetMapping("/get_current_name")
	public ResponseEntity<String> getCurrentName(HttpServletRequest request) {
		Map<String, Object> rs = new HashMap<>();
        ObjectMapper om = new ObjectMapper();
		try {		
			HttpSession session = request.getSession(false);
			if (session != null) {
				rs.put("status", 200);
	            rs.put("name", session.getAttribute("name"));
			} else {
				rs.put("status", 404);
	            rs.put("mensaje", "No se ha encontrado al usuario en la sesión actual.");
	            rs.put("message", "Could not find the current session's user");
			}
			 String json = om.writeValueAsString(rs);
             return ResponseEntity.ok(json);
		} catch (Exception e) {
			rs.put("status", 500);
            rs.put("mensaje", "Error interno del servidor al cerrar la sesión: " + e.getMessage());
            rs.put("message", "Internal Server error during logout: " + e.getMessage());
            try {
                String json = om.writeValueAsString(rs);
                return ResponseEntity.ok(json);
            } catch (Exception jsonEx) {
                return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
            }
		}
	}
	
	@PostMapping("/new_user_submit")
	public ResponseEntity<String> postNewUser(@RequestBody UsuariosModel newUser) {
		Map<String, Object> rs = new HashMap<>();
        ObjectMapper om = new ObjectMapper();
		try {
			if (newUser != null) {
				if (validator.isValidName(newUser.getName()) != null) {
					rs.put("status", 403);
					rs.put("mensaje", "No se pudo crear al usuario: "+validator.isValidName(newUser.getName()));
					rs.put("message", "Could not create the user: "+validator.isValidName(newUser.getName()));
				} else if (validator.isValidEmail(newUser.getEmail()) != null) {
					rs.put("status", 403);
					rs.put("mensaje", "No se pudo crear al usuario: "+validator.isValidEmail(newUser.getEmail()));
					rs.put("message", "Could not create the user: "+validator.isValidEmail(newUser.getEmail()));
				} else if (validator.isValidPassword(newUser.getPassword()) != null) {
					rs.put("status", 403);
					rs.put("mensaje", "No se pudo crear al usuario: "+validator.isValidPassword(newUser.getPassword()));
					rs.put("message", "Could not create the user: "+validator.isValidPassword(newUser.getPassword()));
				} else if (newUser.getRole() == 0) {
					rs.put("status", 403);
					rs.put("mensaje", "No se pudo crear al usuario: Role is 0");
					rs.put("message", "Could not create the user:  Role is 0");
				} else {
					// insertar al usuario en la base de datos
					rs.put("status", 200);
					System.out.println("Se ha creado el usuario: "+newUser.toString());
				}
			} else {
				rs.put("status", 400);
	            rs.put("mensaje", "No se han recibido datos del nuevo usuario");
	            rs.put("message", "\"No data has been received for the new user");
			}
			String json = om.writeValueAsString(rs);
            return ResponseEntity.ok(json);
		} catch (Exception e) {
			rs.put("status", 500);
            rs.put("mensaje", "Error interno del servidor");
            rs.put("message", "Internal Server error");
            try {
                String json = om.writeValueAsString(rs);
                return ResponseEntity.ok(json);
            } catch (Exception jsonEx) {
                return ResponseEntity.status(500).body("{\"status\": 500, \"message\": \"Error al serializar el mensaje de error\"}");
            }
		}
	}
	
	
	/**
	 * Provides a simple endpoint to test connectivity to the Users backend controller.
	 * This method always returns a success status and a welcome message,
	 * unless an unexpected internal server error occurs during the response serialization.
	 *
	 * @return A {@link org.springframework.http.ResponseEntity} containing a JSON string.
	 * The JSON includes:
	 * <ul>
	 * <li>{@code status}: HTTP status code (e.g., 200 for success, 500 for internal errors).</li>
	 * <li>{@code message}: A descriptive message indicating successful connection or an error.</li>
	 * </ul>
	 * Example successful response: {@code {"status": 200, "message": "Hola desde el controlador de Usuarios del Backend"}}
	 * Example error response: {@code {"status": 500, "message": "Internal Server Error"}}
	 */
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
	

	
	
	// Para la encriptación de Datos según Copilot (lo mismo para los emails):
	/*
	  
	@RestController
	@RequestMapping("/users")
	public class UserController {

    	private final UserService userService;

    	public UserController(UserService userService) {
        	this.userService = userService;
    	}

    	@PostMapping("/encrypt")
    	public String encryptPassword(@RequestParam String password) {
        	return userService.encryptPassword(password);
    	}

    	@PostMapping("/verify")
    	public boolean verifyPassword(@RequestParam String rawPassword, @RequestParam String encodedPassword) {
        	return userService.verifyPassword(rawPassword, encodedPassword);
    	}
	}
       	
   	@Service
	public class UserService {

    	private final PasswordEncoder passwordEncoder;

    	public UserService(PasswordEncoder passwordEncoder) {
        	this.passwordEncoder = passwordEncoder;
    	}

    	public String encryptPassword(String rawPassword) {
        	return passwordEncoder.encode(rawPassword);
    	}

    	public boolean verifyPassword(String rawPassword, String encodedPassword) {
        	return passwordEncoder.matches(rawPassword, encodedPassword);
    	}
	}
	
	@Configuration
	public class SecurityConfig {

    	@Bean
    	public PasswordEncoder passwordEncoder() {
        	return new BCryptPasswordEncoder();
    	}
	}
	
	 */
	
}
