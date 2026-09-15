package com.protecnologia.intranet.repository;

import com.protecnologia.intranet.model.ExperienciaAcademica;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ExperienciaAcademicaRepository {

    private final JdbcTemplate jdbcTemplate;

    public ExperienciaAcademicaRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<ExperienciaAcademica> obtenerTodas() {

        String sql = """
            SELECT
                id,
                nombre,
                tecnologia,
                institucion,
                descripcion,
                fecha_inicio,
                fecha_fin
            FROM dbo.Experencia_academica
            ORDER BY fecha_inicio DESC, id DESC
            """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            ExperienciaAcademica experiencia = new ExperienciaAcademica();

            experiencia.setId(rs.getInt("id"));
            experiencia.setNombre(rs.getString("nombre"));
            experiencia.setTecnologia(rs.getString("tecnologia"));
            experiencia.setInstitucion(rs.getString("institucion"));
            experiencia.setDescripcion(rs.getString("descripcion"));

            if (rs.getDate("fecha_inicio") != null) {
                experiencia.setFechaInicio(
                    rs.getDate("fecha_inicio").toLocalDate()
                );
            }

            if (rs.getDate("fecha_fin") != null) {
                experiencia.setFechaFin(
                    rs.getDate("fecha_fin").toLocalDate()
                );
            }

            return experiencia;
        });
    }
}