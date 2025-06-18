package com.asesoria.dto;

import java.sql.Timestamp;

public interface FacturaProjection {
	long getId();
	
	String getTitle();
	
	Timestamp getUploadDate();
	
	Timestamp getValidDate();
	
	byte[] getPdf();
	
    String getUser();
    
    String getType();
	
}
