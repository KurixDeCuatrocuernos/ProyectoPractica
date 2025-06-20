package com.asesoria.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asesoria.models.UsuariosModel;
import com.asesoria.repositories.UsuariosRepository;

import jakarta.transaction.Transactional;

@Service
public class UsuariosService {
	 @Autowired
	 private UsuariosRepository userRepo;

}
