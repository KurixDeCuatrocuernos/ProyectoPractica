package com.asesoria.repositories;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.asesoria.models.BillsTypeModel;

@Repository
public interface BillsTypeRepository extends JpaRepository<BillsTypeModel, Integer> {

	
	public Optional<BillsTypeModel> findById(int Id);
	
	public List<BillsTypeModel> findAll();
	
	public void deleteById(int Id);
	
}
