package com.asesoria.dto;

import java.util.Objects;

public class DeleteUserProjection {
	
	private long id;
	
	public DeleteUserProjection() {}
	
	public DeleteUserProjection(long id) {
		this.id = id;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DeleteUserProjection other = (DeleteUserProjection) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DeleteUserProjection [id=").append(id).append("]");
		return builder.toString();
	}
	
}
