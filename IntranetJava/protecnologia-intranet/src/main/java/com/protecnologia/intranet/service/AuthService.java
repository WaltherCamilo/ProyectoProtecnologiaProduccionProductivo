package com.protecnologia.intranet.service;

import com.protecnologia.intranet.model.Usuario;
import com.protecnologia.intranet.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public String registrar(
            String nombre,
            String apellido,
            String correo,
            String password
    ) {

        if (usuarioRepository.existeCorreo(correo)) {
            throw new IllegalArgumentException(
                    "El correo ya está registrado"
            );
        }

        String passwordHash =
                passwordEncoder.encode(password);

        String token =
                UUID.randomUUID().toString();

        LocalDateTime expiracion =
                LocalDateTime.now().plusHours(24);

        usuarioRepository.crearUsuario(
                nombre,
                apellido,
                correo,
                passwordHash,
                "EMPLEADO",
                token,
                expiracion
        );

        return token;
    }

    public boolean verificarToken(String token) {

        Usuario usuario;

        try {
            usuario =
                    usuarioRepository.buscarPorToken(token);
        } catch (Exception e) {
            return false;
        }

        if (usuario == null) {
            return false;
        }

        if (usuario.getActivo()) {
            return true;
        }

        if (usuario.getTokenExpiracion() == null) {
            return false;
        }

        if (usuario.getTokenExpiracion()
                .isBefore(LocalDateTime.now())) {
            return false;
        }

        int actualizados =
                usuarioRepository.activarUsuario(
                        usuario.getId()
                );

        return actualizados > 0;
    }

    public Usuario login(
            String correo,
            String password
    ) {

        Usuario usuario;

      try {
    usuario = usuarioRepository.buscarPorCorreo(correo);
} catch (org.springframework.dao.EmptyResultDataAccessException e) {
    throw new IllegalArgumentException(
        "Correo o contraseña incorrectos"
    );
} catch (Exception e) {
    System.err.println("ERROR CONSULTANDO USUARIO EN SQL SERVER:");
    e.printStackTrace();

    throw new IllegalStateException(
        "Error interno al consultar la base de datos"
    );
}

        if (usuario == null) {
            throw new IllegalArgumentException(
                    "Correo o contraseña incorrectos"
            );
        }

        if (!usuario.getActivo()) {
            throw new IllegalArgumentException(
                    "La cuenta todavía no está activada"
            );
        }

        if (!passwordEncoder.matches(
                password,
                usuario.getPasswordHash()
        )) {
            throw new IllegalArgumentException(
                    "Correo o contraseña incorrectos"
            );
        }

        return usuario;
    }
}