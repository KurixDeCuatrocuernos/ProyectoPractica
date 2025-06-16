package com.asesoria.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="usuarios")
public class UsuariosModel {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="Id")
	private long Id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="email")
	private String email;
	
	@Column(name="password")
	private String password;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "role_id")
	private RoleModel role;
	
	@Column(name="confirmed")
	private int confirmed;
	
	@OneToMany(mappedBy="userId")
	private List<FacturaModel> facturas = new ArrayList<>();
	
	public UsuariosModel() {}

	public UsuariosModel(String name, String email, String password, RoleModel role, int confirmed,
			List<FacturaModel> facturas) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.role = role;
		this.confirmed = confirmed;
		this.facturas = facturas;
	}

	public UsuariosModel(String name, String email, String password) {
		this.name = name;
		this.email = email;
		this.password = password;
	}
	
	public UsuariosModel(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public UsuariosModel(long id, String name, String email, RoleModel role, int confirmed,
			List<FacturaModel> facturas) {
		Id = id;
		this.name = name;
		this.email = email;
		this.role = role;
		this.confirmed = confirmed;
		this.facturas = facturas;
	}

	public long getId() {
		return Id;
	}

	public void setId(long id) {
		Id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public RoleModel getRole() {
		return role;
	}

	public void setRole(RoleModel role) {
		this.role = role;
	}

	public int getConfirmed() {
		return confirmed;
	}

	public void setConfirmed(int confirmed) {
		this.confirmed = confirmed;
	}

	public List<FacturaModel> getFacturas() {
		return facturas;
	}

	public void setFacturas(List<FacturaModel> facturas) {
		this.facturas = facturas;
	}

	@Override
	public int hashCode() {
		return Objects.hash(Id, confirmed, email, name, password);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UsuariosModel other = (UsuariosModel) obj;
		return Id == other.Id && confirmed == other.confirmed && Objects.equals(email, other.email)
				&& Objects.equals(name, other.name) && Objects.equals(password, other.password);
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UsuariosModel [Id=").append(Id).append(", name=").append(name).append(", email=").append(email)
				.append(", password=").append(password).append(", confirmed=").append(confirmed).append("]");
		return builder.toString();
	}

	
	
}
