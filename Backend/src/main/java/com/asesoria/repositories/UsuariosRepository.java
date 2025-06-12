package com.asesoria.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.asesoria.dto.UsuariosProjection;
import com.asesoria.models.UsuariosModel;

@Repository
public interface UsuariosRepository extends JpaRepository<UsuariosModel, Long>{

	public Optional<UsuariosModel> findById(long Id);
	
    @Query("SELECT u.id AS id, u.name AS name, u.email AS email FROM UsuariosModel u WHERE u.id = :id")
	public Optional<UsuariosProjection> findUserWithoutSensitiveData(long id);

	public Optional<UsuariosModel> findByEmail(String email);
	
	public int findRoleById(long id);
	
	public int findConfirmedById(long id);
	
	public void deleteById(long id);
	    


	
}
