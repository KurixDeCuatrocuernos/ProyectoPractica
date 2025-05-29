package com.asesoria.repositories;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.asesoria.models.FacturaModel;

@Repository
public interface FacturaRepository extends JpaRepository<FacturaModel, Long> {
	
	// Método para buscar las facturas por su ID
	public Optional<FacturaModel> findById(long Id);
	
	// Método para buscar las facturas por su BillType
	public List<FacturaModel> findByBillTypeId(int billTypeId);
	
	// Método para buscar las facturas por su Provider
	public List<FacturaModel> findByProviderId(int providerId);
	
	// Método para buscar las facturas por su Client
	public List<FacturaModel> findByClientId(int clientId);
	
	// Método para buscar las facturas por su UserId y ValidDate (puede ser null, pero que sólo muestre los que no lo sean)
	@Query("SELECT f FROM FacturaModel f WHERE f.user.id = :userId AND f.validDate IS NOT NULL")
	List<FacturaModel> findByUserIdAndValidDateIsNotNull(@Param("userId") int userId);
	
	// Método para buscar una factura en un intervalo de fechas con un orden
	public List<FacturaModel> findByValidDateBetween(Timestamp startDate, Timestamp endDate, Sort sort);
	
	public void deleteById(long Id);
	
}
