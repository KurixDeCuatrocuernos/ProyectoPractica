package com.asesoria.dto;

import com.asesoria.models.RoleModel;

public interface ShowUserProjection {
	long getId();
	String getName();
	String getEmail();
	RoleModel getRole();
	int getConfirmed();
}
