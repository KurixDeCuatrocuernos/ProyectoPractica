package com.asesoria;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Scanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.client.RestTemplate;

import com.asesoria.models.BillsTypeModel;
import com.asesoria.models.ClientesModel;
import com.asesoria.models.FacturaModel;
import com.asesoria.models.ProveedoresModel;
import com.asesoria.models.UsuariosModel;
import com.asesoria.repositories.BillsTypeRepository;
import com.asesoria.repositories.ClientesRepository;
import com.asesoria.repositories.FacturaRepository;
import com.asesoria.repositories.ProveedoresRepository;
import com.asesoria.repositories.UsuariosRepository;

@SpringBootApplication
@ComponentScan(basePackages = "com.asesoria")
@EnableJpaRepositories(basePackages = "com.asesoria.repositories")
public class BackendApplication {
	
	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(BackendApplication.class, args);
		
		var providerRepo = context.getBean(ProveedoresRepository.class);
		var clientRepo = context.getBean(ClientesRepository.class);
		var billsTypeRepo = context.getBean(BillsTypeRepository.class);
		var userRepo = context.getBean(UsuariosRepository.class);
		var billRepo = context.getBean(FacturaRepository.class);

		ProveedoresModel proveedor = new ProveedoresModel("Proveedor Prueba");
		ClientesModel cliente = new ClientesModel("Cliente Prueba");
		BillsTypeModel billType = new BillsTypeModel("Tipo de Factura Prueba");
		UsuariosModel usuario = new UsuariosModel();
		LocalDateTime fecha = LocalDateTime.now();
		byte[] dummyPdf = "Este es un archivo PDF de prueba".getBytes();
		FacturaModel factura = new FacturaModel();
	
		Scanner lector = new Scanner(System.in);
		
		providerRepo.save(proveedor);
		System.out.println("Proveedor Insertado: "+proveedor.toString());
		Optional<ProveedoresModel> proveedorRecogido = providerRepo.findById(proveedor.getId());
		System.out.println("Proveedor Recogido: "+proveedorRecogido.get().toString());			
			
		clientRepo.save(cliente);			
		System.out.println("Proveedor Insertado: "+cliente.toString());			
		Optional<ClientesModel> clienteRecogido = clientRepo.findById(cliente.getId());			
		System.out.println("Proveedor Recogido: "+clienteRecogido.get().toString());								
			
		billsTypeRepo.save(billType);
		System.out.println("Tipo de Factura Insertada: "+billType.toString());
		Optional<BillsTypeModel> BillTypeRecogido = billsTypeRepo.findById(billType.getId());
		System.out.println("Proveedor Recogido: "+BillTypeRecogido.get().toString());
		
		usuario.setName("Usuario Prueba");
		usuario.setEmail("usuarioprueba@correo.com");
		usuario.setPassword("12345");
		usuario.setRole(0);
		usuario.setConfirmed(0);
		userRepo.save(usuario);
		System.out.println("Usuario Insertado: "+usuario.toString());
		Optional<UsuariosModel> usuarioRecogido = userRepo.findById(usuario.getId());
		System.out.println("Usuario Recogido: "+usuarioRecogido.get().toString());
				
		factura.setUploadDate(Timestamp.valueOf(fecha));
		factura.setPdf(dummyPdf);
		factura.setUserId(usuario);
		factura.setProviderId(proveedor);
		factura.setClientId(cliente);
		factura.setBillTypeId(billType);
		billRepo.save(factura);
		System.out.println("Factura Insertada: "+factura.toString());
		Optional<FacturaModel> facturaRecogida = billRepo.findById(factura.getId());
		System.out.println("Factura Recogida: "+facturaRecogida.get().toString());
			
		System.out.println("¿Quieres Borrar los datos de prueba?");
			
		lector.nextLine();
			
		billRepo.deleteById(factura.getId());
		providerRepo.deleteById(proveedor.getId());
		clientRepo.deleteById(cliente.getId());
		billsTypeRepo.deleteById(billType.getId());
		userRepo.deleteById(usuario.getId());
			
		System.out.println("Se han borrado los datos de prueba");

	}	
	
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	} 
	
//	@Bean
//	public CommandLineRunner run(RestTemplate restTemplate, FacturaRepository facturaRepo) {
//		return args -> {
//			String url = "http://localhost:9000/api/facturas/1";
//			String response = restTemplate.getForObject(url, String.class);
//			System.out.println("Se obtuvo la factura: "+response);
//		};
//	}

}
