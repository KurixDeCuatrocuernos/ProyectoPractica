package com.asesoria.models;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name="bills")
public class FacturaModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="Id")
	private long Id;
	
	@Column(name="upload_date", nullable = true)
	private Timestamp uploadDate;
	
	@Column(name="valid_date")
	private Timestamp validDate;
	
	@Lob
	@Column(name="bill")
	private byte[] pdf;
	
	@ManyToOne
	@JoinColumn(name="usuario_id", referencedColumnName="Id")
	private UsuariosModel userId;

	@ManyToOne(optional = true)
	@JoinColumn(name = "proveedor_id", referencedColumnName = "Id", nullable = true)
	private ProveedoresModel providerId;
	
	@ManyToOne(optional = true)
	@JoinColumn(name = "cliente_id", referencedColumnName = "Id", nullable = true)
	private ClientesModel clientId;
	
	@ManyToOne
	@JoinColumn(name="bill_type", referencedColumnName = "Id")
	private BillsTypeModel billTypeId;
	
	// Empty Builder Method
	public FacturaModel() {}

	public FacturaModel(Timestamp uploadDate, Timestamp validDate, byte[] pdf, UsuariosModel userId,
			ProveedoresModel providerId, ClientesModel clientId, BillsTypeModel billTypeId) {
		this.uploadDate = uploadDate;
		this.validDate = validDate;
		this.pdf = pdf;
		this.userId = userId;
		this.providerId = providerId;
		this.clientId = clientId;
		this.billTypeId = billTypeId;
	}

	public long getId() {
		return Id;
	}

	public void setId(long id) {
		Id = id;
	}

	public Timestamp getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(Timestamp uploadDate) {
		this.uploadDate = uploadDate;
	}

	public Timestamp getValidDate() {
		return validDate;
	}

	public void setValidDate(Timestamp validDate) {
		this.validDate = validDate;
	}

	public byte[] getPdf() {
		return pdf;
	}

	public void setPdf(byte[] pdf) {
		this.pdf = pdf;
	}

	public UsuariosModel getUserId() {
		return userId;
	}

	public void setUserId(UsuariosModel userId) {
		this.userId = userId;
	}

	public ProveedoresModel getProviderId() {
		return providerId;
	}

	public void setProviderId(ProveedoresModel providerId) {
		this.providerId = providerId;
	}

	public ClientesModel getClientId() {
		return clientId;
	}

	public void setClientId(ClientesModel clientId) {
		this.clientId = clientId;
	}

	public BillsTypeModel getBillTypeId() {
		return billTypeId;
	}

	public void setBillTypeId(BillsTypeModel billTypeId) {
		this.billTypeId = billTypeId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + Arrays.hashCode(pdf);
		result = prime * result + Objects.hash(Id, billTypeId, clientId, providerId, uploadDate, userId, validDate);
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FacturaModel other = (FacturaModel) obj;
		return Id == other.Id && Objects.equals(billTypeId, other.billTypeId)
				&& Objects.equals(clientId, other.clientId) && Arrays.equals(pdf, other.pdf)
				&& Objects.equals(providerId, other.providerId) && Objects.equals(uploadDate, other.uploadDate)
				&& Objects.equals(userId, other.userId) && Objects.equals(validDate, other.validDate);
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("FacturaModel [Id=").append(Id).append(", uploadDate=").append(uploadDate).append(", validDate=")
				.append(validDate).append(", pdf=").append(Arrays.toString(pdf)).append("]");
		return builder.toString();
	}
	
	
}
