package com.protecnologia.intranet.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class EstadoDbController {

    private final JdbcTemplate jdbcTemplate;

    public EstadoDbController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/estado-db")
    public Map<String, Object> estadoDb() {

        Map<String, Object> resultado = jdbcTemplate.queryForMap("""
            SELECT
                @@SERVERNAME AS servidor,
                DB_NAME() AS baseDatos,
                SUSER_SNAME() AS usuario
        """);

        return Map.of(
            "estado", "OK",
            "servidor", resultado.get("servidor"),
            "baseDatos", resultado.get("baseDatos"),
            "usuario", resultado.get("usuario")
        );
    }
}