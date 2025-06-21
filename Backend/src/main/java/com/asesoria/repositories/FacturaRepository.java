package com.asesoria.repositories;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.asesoria.dto.FacturaProjection;
import com.asesoria.models.BillsTypeModel;
import com.asesoria.models.ClientesModel;
import com.asesoria.models.FacturaModel;
import com.asesoria.models.ProveedoresModel;

@Repository
public interface FacturaRepository extends JpaRepository<FacturaModel, Long> {
	
	// Método para buscar las facturas por su ID
	public Optional<FacturaModel> findById(long Id);
	
	// Método para buscar las facturas por su BillType
	public List<FacturaModel> findByBillTypeId(BillsTypeModel billTypeId);
	
	// Método para buscar las facturas por su Provider
	public List<FacturaModel> findByProviderId(ProveedoresModel providerId);
	
	// Método para buscar las facturas por su Client
	public List<FacturaModel> findByClientId(ClientesModel clientId);
	
	@Query("SELECT f FROM FacturaModel f WHERE f.userId.id = :userId AND f.validDate IS NOT NULL")
	List<FacturaModel> findByUserIdAndValidDateIsNotNull(@Param("userId") long userId);
	
	List<FacturaModel> findByValidDateIsNotNull();
	
	@Query("SELECT f.id AS id, f.title AS title, f.uploadDate AS uploadDate, " +
		       "f.validDate AS validDate, f.pdf AS pdf, u.name AS user, bt.name AS type " +
		       "FROM FacturaModel f " +
		       "JOIN f.userId u " +
		       "JOIN f.billTypeId bt")
	List<FacturaProjection> findFacturaProjections();
	
	 @Query("SELECT f.id AS id, f.title AS title, f.uploadDate AS uploadDate, " +
	           "f.validDate AS validDate, f.pdf AS pdf, u.name AS user, bt.name AS type " +
	           "FROM FacturaModel f " +
	           "JOIN f.userId u " +
	           "JOIN f.billTypeId bt")
	 List<FacturaProjection> findAllFacturasProjected();
	 
	 @Query("SELECT f.id AS id, f.title AS title, f.uploadDate AS uploadDate, " +
		       "f.validDate AS validDate, f.pdf AS pdf, u.name AS user, bt.name AS type " +
		       "FROM FacturaModel f " +
		       "JOIN f.userId u " +
		       "JOIN f.billTypeId bt " +
		       "WHERE u.id = :userId AND f.validDate IS NOT NULL")
	List<FacturaProjection> findFacturasByUserAndValidDate(@Param("userId") long userId);
	 
	@Query("SELECT f.id AS id, f.title AS title, f.uploadDate AS uploadDate, " +
		       "f.validDate AS validDate, f.pdf AS pdf, u.name AS user, bt.name AS type " +
		       "FROM FacturaModel f " +
		       "JOIN f.userId u " +
		       "JOIN f.billTypeId bt " +
		       "WHERE u.id = :userId AND f.validDate IS NULL")
	List<FacturaProjection> findFacturasByUserAndValidDateNull(@Param("userId") long userId);
	
	// Método para contar las facturas insertadas por un usuario
	long countByUserId_Id(long userId);
	
	// Método para detectar si hay facturas sin publicar
	@Query("SELECT COUNT(f) FROM FacturaModel f WHERE f.userId.id = :userId AND f.validDate IS NULL")
	long countByUserIdAndValidDateIsNull(@Param("userId") long userId);
	
	@Modifying
	@Query("UPDATE FacturaModel u SET u.validDate = :validDate WHERE u.Id = :id")
	int updateValidDateById(@Param("id") Long id, @Param("validDate") Timestamp validDate);
	
	@Modifying
	@Query("UPDATE FacturaModel f SET f.title = :title WHERE f.Id = :id")
	int updateTitleById(@Param("id") Long id, @Param("title") String title);
	
	@Modifying
	@Query("UPDATE FacturaModel f SET f.uploadDate = :uploadDate WHERE f.Id = :id")
	int updateUploadDateById(@Param("id") Long id, @Param("uploadDate") Timestamp uploadDate);
	
	@Modifying
	@Query("UPDATE FacturaModel f SET f.pdf = :pdf WHERE f.Id = :id")
	int updatePdfById(@Param("id") Long id, @Param("pdf") byte[] pdf);
	
	@Modifying
	@Query("UPDATE FacturaModel f SET f.billTypeId = :type WHERE f.Id = :id")
	int updateTypeById(@Param("id") Long id, @Param("type") BillsTypeModel type);
	
	
	// Método para buscar una factura en un intervalo de fechas con un orden
	public List<FacturaModel> findByValidDateBetween(Timestamp startDate, Timestamp endDate, Sort sort);
	
	public void deleteById(long Id);
	
}
