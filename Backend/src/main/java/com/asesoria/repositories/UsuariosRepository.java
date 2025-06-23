package com.asesoria.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.asesoria.dto.ShowUserProjection;
import com.asesoria.dto.UsuariosProjection;
import com.asesoria.models.RoleModel;
import com.asesoria.models.UsuariosModel;

@Repository
public interface UsuariosRepository extends JpaRepository<UsuariosModel, Long>{

	public Optional<UsuariosModel> findById(long Id);
	
    @Query("SELECT u.id AS id, u.name AS name, u.email AS email FROM UsuariosModel u WHERE u.id = :id")
	public Optional<UsuariosProjection> findUserWithoutSensitiveData(long id);

    @Query("SELECT u FROM UsuariosModel u JOIN FETCH u.role WHERE u.email = :email")
    Optional<UsuariosModel> findByEmailWithRole(@Param("email") String email);
	
	@Query("SELECT u.id AS id, u.name AS name, u.email AS email, u.role AS role, u.confirmed AS confirmed FROM UsuariosModel u")
	List<ShowUserProjection> findAllWithoutBillsAndPassword();
	
	@Modifying
	@Query("UPDATE UsuariosModel u SET u.name = :name, u.email = :email  WHERE u.id = :id")
	int updateNombreYEmail(@Param("id") Long id, @Param("name") String name, @Param("email") String email);
	
	@Modifying
	@Query("UPDATE UsuariosModel u SET u.name = :name WHERE u.Id = :id")
	int updateNameById(@Param("id") Long id, @Param("name") String name);

	@Modifying
	@Query("UPDATE UsuariosModel u SET u.email = :email WHERE u.Id = :id")
	int updateEmailById(@Param("id") Long id, @Param("email") String email);
	
	@Modifying
	@Query("UPDATE UsuariosModel u SET u.password = :password WHERE u.Id = :id")
	int updatePasswordById(@Param("id") Long id, @Param("password") String password);

	@Modifying
	@Query("UPDATE UsuariosModel u SET u.role = :role WHERE u.Id = :id")
	int updateRoleById(@Param("id") Long id, @Param("role") RoleModel role);
	
	@Modifying
	@Query("UPDATE UsuariosModel u SET u.confirmed = :confirmed WHERE u.Id = :id")
	int updateConfirmedById(@Param("id") Long id, @Param("confirmed") int confirmed);
	
	public String findNameById(long id); 
	
	public int findRoleById(long id);
	
	public int findConfirmedById(long id);
	
	public void deleteById(long id);
	    


	
}
