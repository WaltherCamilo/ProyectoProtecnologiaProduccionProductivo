package com.protecnologia.intranet.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/sugerencias")
public class SugerenciaUsuarioController {

    private static final Logger log = LoggerFactory.getLogger(SugerenciaUsuarioController.class);

    private final JdbcTemplate jdbcTemplate;

    public SugerenciaUsuarioController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public record SolicitudSugerencia(
        @NotBlank
        @Size(max = 120)
        String nombre,

        @NotBlank
        @Size(max = 30)
        String telefono,

        @NotBlank
        @Email
        @Size(max = 254)
        String correo,

        @NotBlank
        @Size(max = 1000)
        String mensaje
    ) {}

    @PostMapping
    public ResponseEntity<Map<String, String>> crear(
            @Valid @RequestBody SolicitudSugerencia solicitud) {

        try {
            int filas = jdbcTemplate.update("""
                INSERT INTO dbo.sugerencia_de_los_usuarios
                    (nombre, telefono, correo, mensaje)
                VALUES (?, ?, ?, ?)
                """,
                solicitud.nombre().trim(),
                solicitud.telefono().trim(),
                solicitud.correo().trim(),
                solicitud.mensaje().trim()
            );

            if (filas != 1) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("mensaje", "No se pudo confirmar el registro."));
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(
                Map.of("mensaje",
                    "¡Gracias por enviarnos tu mensaje! Pronto nuestro equipo se pondrá en contacto contigo. :)")
            );

        } catch (DataAccessException ex) {
            // No devolver detalles internos de la base de datos al visitante.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("mensaje",
                    "No pudimos guardar tu mensaje. Inténtalo nuevamente más tarde."));
        }
    }
}
