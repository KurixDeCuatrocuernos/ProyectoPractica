package com.asesoria.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.asesoria.models.UsuariosModel;

@Repository
public interface UsuariosRepository extends JpaRepository<UsuariosModel, Long>{

	public Optional<UsuariosModel> findById(long Id);
	
	public int findRoleById(long id);
	
	public int findConfirmedById(long id);
	
	public void deleteById(long id);
	
}
