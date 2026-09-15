package com.protecnologia.intranet.repository;

import com.protecnologia.intranet.model.ExperienciaLaboral;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ExperienciaLaboralRepository {

    private final JdbcTemplate jdbcTemplate;

    public ExperienciaLaboralRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<ExperienciaLaboral> obtenerTodas() {

        String sql = """
            SELECT
                id,
                empresa,
                cargo,
                ciudad,
                descripcion,
                fecha_inicio,
                fecha_fin,
                jefe_inmediato,
                telefono_contacto
            FROM dbo.Experencia_laboral
            ORDER BY fecha_inicio DESC, id DESC
            """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            ExperienciaLaboral experiencia = new ExperienciaLaboral();

            experiencia.setId(rs.getInt("id"));
            experiencia.setEmpresa(rs.getString("empresa"));
            experiencia.setCargo(rs.getString("cargo"));
            experiencia.setCiudad(rs.getString("ciudad"));
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

            experiencia.setJefeInmediato(rs.getString("jefe_inmediato"));
            experiencia.setTelefonoContacto(rs.getString("telefono_contacto"));

            return experiencia;
        });
    }
}