package com.asesoria.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="billstype")
public class BillsTypeModel {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="Id")
	private int Id;
	
	@Column(name="name")
	private String name;
	
	@OneToMany(mappedBy="billTypeId")
	private List<FacturaModel> facturas = new ArrayList<>();
	
	public BillsTypeModel() {}

	public BillsTypeModel(String name) {
		this.name = name;
	}

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<FacturaModel> getFacturas() {
		return facturas;
	}

	public void setFacturas(List<FacturaModel> facturas) {
		this.facturas = facturas;
	}

	@Override
	public int hashCode() {
		return Objects.hash(Id, name);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BillsTypeModel other = (BillsTypeModel) obj;
		return Id == other.Id && Objects.equals(name, other.name);
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("BillsTypeModel [Id=").append(Id).append(", name=").append(name).append(", facturas=")
				.append(facturas).append("]");
		return builder.toString();
	}
	
}
