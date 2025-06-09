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
@Table(name="clientes")
public class ClientesModel {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="Id")
	private int Id;
	
	@Column(name="name")
	private String name;
	
	@OneToMany(mappedBy="clientId")
	private List<FacturaModel> facturas = new ArrayList<>();
	
	//Empty builder method
	public ClientesModel() {}
	
	public ClientesModel(String name) {
		this.name = name;
	}
	
	public int getId() {
		return Id;
	}
	
	public void setId(int id) {
		this.Id = id;
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
		ClientesModel other = (ClientesModel) obj;
		return Id == other.Id && Objects.equals(name, other.name);
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ClientesModel [Id=").append(Id).append(", name=").append(name).append("]");
		return builder.toString();
	}


}
