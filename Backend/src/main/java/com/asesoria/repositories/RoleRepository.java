package com.asesoria.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.asesoria.models.RoleModel;

@Repository
public interface RoleRepository extends JpaRepository<RoleModel, Long>{
	
	Optional<RoleModel> findById(long id);
	
	Optional<RoleModel> findByName(String name);
}
