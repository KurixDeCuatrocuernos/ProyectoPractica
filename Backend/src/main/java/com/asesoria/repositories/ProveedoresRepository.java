package com.asesoria.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.asesoria.models.ProveedoresModel;

@Repository
public interface ProveedoresRepository extends JpaRepository<ProveedoresModel, Integer>{

	public Optional<ProveedoresModel> findById(int Id);
	
	public List<ProveedoresModel> findAll();
	
	public void deleteById(int Id);
	
}
