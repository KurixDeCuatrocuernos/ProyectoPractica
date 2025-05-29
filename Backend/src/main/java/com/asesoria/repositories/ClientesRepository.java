package com.asesoria.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.asesoria.models.ClientesModel;

@Repository
public interface ClientesRepository extends JpaRepository<ClientesModel, Integer>{

	public Optional<ClientesModel> findById(int Id);
	
	List<ClientesModel> findAll();
	
	public void deleteById(int Id);
	
}
