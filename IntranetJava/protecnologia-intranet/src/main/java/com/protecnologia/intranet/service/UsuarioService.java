package com.protecnologia.intranet.service;

import com.protecnologia.intranet.model.Usuario;
import com.protecnologia.intranet.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario buscarPorCorreo(String correo) {
        return repository.buscarPorCorreo(correo);
    }

    public boolean existeCorreo(String correo) {
        return repository.existeCorreo(correo);
    }
}