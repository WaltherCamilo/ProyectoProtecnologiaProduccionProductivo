package com.protecnologia.intranet.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/diagnostico-sugerencias")
public class DiagnosticoSugerenciasController {

    private final JdbcTemplate jdbcTemplate;

    public DiagnosticoSugerenciasController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping
    public Map<String, Object> diagnosticar() {
        return jdbcTemplate.queryForMap("""
            SELECT
                DB_NAME() AS baseDatos,
                OBJECT_ID(
                    'dbo.sugerencia_de_los_usuarios',
                    'U'
                ) AS idTabla,
                HAS_PERMS_BY_NAME(
                    'dbo.sugerencia_de_los_usuarios',
                    'OBJECT',
                    'INSERT'
                ) AS permisoInsertar
            """);
    }
}
