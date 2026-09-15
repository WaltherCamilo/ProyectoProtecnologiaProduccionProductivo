package com.protecnologia.intranet.repository;

import com.protecnologia.intranet.model.Usuario;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Repository
public class UsuarioRepository {

    private final JdbcTemplate jdbcTemplate;

    public UsuarioRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Usuario buscarPorCorreo(String correo) {

        String sql = """
            SELECT id,
                   nombre,
                   apellido,
                   correo,
                   password_hash,
                   rol,
                   activo,
                   token_verificacion,
                   token_expiracion,
                   fecha_registro,
                   fecha_activacion
            FROM dbo.Usuarios
            WHERE correo = ?
        """;

        return jdbcTemplate.queryForObject(
            sql,
            (rs, rowNum) -> mapearUsuario(rs),
            correo
        );
    }

    public Usuario buscarPorToken(String token) {

        String sql = """
            SELECT id,
                   nombre,
                   apellido,
                   correo,
                   password_hash,
                   rol,
                   activo,
                   token_verificacion,
                   token_expiracion,
                   fecha_registro,
                   fecha_activacion
            FROM dbo.Usuarios
            WHERE token_verificacion = ?
        """;

        return jdbcTemplate.queryForObject(
            sql,
            (rs, rowNum) -> mapearUsuario(rs),
            token
        );
    }

    public boolean existeCorreo(String correo) {

        String sql = """
            SELECT COUNT(*)
            FROM dbo.Usuarios
            WHERE correo = ?
        """;

        Integer cantidad = jdbcTemplate.queryForObject(
            sql,
            Integer.class,
            correo
        );

        return cantidad != null && cantidad > 0;
    }

    public int crearUsuario(
            String nombre,
            String apellido,
            String correo,
            String passwordHash,
            String rol,
            String tokenVerificacion,
            LocalDateTime tokenExpiracion
    ) {

        String sql = """
            INSERT INTO dbo.Usuarios
            (
                nombre,
                apellido,
                correo,
                password_hash,
                rol,
                activo,
                token_verificacion,
                token_expiracion,
                fecha_registro
            )
            VALUES (?, ?, ?, ?, ?, 0, ?, ?, SYSDATETIME())
        """;

        return jdbcTemplate.update(
            sql,
            nombre,
            apellido,
            correo,
            passwordHash,
            rol,
            tokenVerificacion,
            Timestamp.valueOf(tokenExpiracion)
        );
    }

    public int activarUsuario(Integer id) {

        String sql = """
            UPDATE dbo.Usuarios
            SET activo = 1,
                token_verificacion = NULL,
                token_expiracion = NULL,
                fecha_activacion = SYSDATETIME()
            WHERE id = ?
        """;

        return jdbcTemplate.update(sql, id);
    }

    public int cambiarPassword(
            String correo,
            String passwordHash
    ) {

        String sql = """
            UPDATE dbo.Usuarios
            SET password_hash = ?
            WHERE correo = ?
        """;

        return jdbcTemplate.update(
            sql,
            passwordHash,
            correo
        );
    }

    private Usuario mapearUsuario(
            java.sql.ResultSet rs
    ) throws java.sql.SQLException {

        Usuario usuario = new Usuario();

        usuario.setId(rs.getInt("id"));
        usuario.setNombre(rs.getString("nombre"));
        usuario.setApellido(rs.getString("apellido"));
        usuario.setCorreo(rs.getString("correo"));
        usuario.setPasswordHash(rs.getString("password_hash"));
        usuario.setRol(rs.getString("rol"));
        usuario.setActivo(rs.getBoolean("activo"));

        usuario.setTokenVerificacion(
            rs.getString("token_verificacion")
        );

        Timestamp tokenExpiracion =
                rs.getTimestamp("token_expiracion");

        if (tokenExpiracion != null) {
            usuario.setTokenExpiracion(
                tokenExpiracion.toLocalDateTime()
            );
        }

        Timestamp fechaRegistro =
                rs.getTimestamp("fecha_registro");

        if (fechaRegistro != null) {
            usuario.setFechaRegistro(
                fechaRegistro.toLocalDateTime()
            );
        }

        Timestamp fechaActivacion =
                rs.getTimestamp("fecha_activacion");

        if (fechaActivacion != null) {
            usuario.setFechaActivacion(
                fechaActivacion.toLocalDateTime()
            );
        }

        return usuario;
    }
}