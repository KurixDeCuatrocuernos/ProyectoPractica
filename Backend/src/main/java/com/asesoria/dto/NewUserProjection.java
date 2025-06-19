package com.asesoria.dto;

import java.util.Objects;

public class NewUserProjection {
	
	private String name;
    private String email;
    private String password;
    private long role;
    
    public NewUserProjection() {}
    
	public NewUserProjection(String name, String email, String password, long role) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.role = role;
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

	public long getRole() {
		return role;
	}

	public void setRole(long role) {
		this.role = role;
	}

	@Override
	public int hashCode() {
		return Objects.hash(email, name, password, role);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		NewUserProjection other = (NewUserProjection) obj;
		return Objects.equals(email, other.email) && Objects.equals(name, other.name)
				&& Objects.equals(password, other.password) && role == other.role;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("NewUserProjection [name=").append(name).append(", email=").append(email).append(", password=")
				.append(password).append(", role=").append(role).append("]");
		return builder.toString();
	}
    
}
