package com.protecnologia.intranet.repository;

import com.protecnologia.intranet.model.InformeGeneral;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class InformeGeneralRepository {

    private final JdbcTemplate jdbcTemplate;

    public InformeGeneralRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<InformeGeneral> obtenerTodos() {

        String sql = """
            SELECT
                id,
                empresa,
                cargo,
                ciudad,
                fecha_inicio,
                fecha_fin,
                descripcion,
                jefe_inmediato,
                telefono_contacto,
                fecha_registro
            FROM dbo.Informe_general
            ORDER BY fecha_inicio DESC, id DESC
            """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            InformeGeneral informe = new InformeGeneral();

            informe.setId(rs.getInt("id"));
            informe.setEmpresa(rs.getString("empresa"));
            informe.setCargo(rs.getString("cargo"));
            informe.setCiudad(rs.getString("ciudad"));

            if (rs.getDate("fecha_inicio") != null) {
                informe.setFechaInicio(
                    rs.getDate("fecha_inicio").toLocalDate()
                );
            }

            if (rs.getDate("fecha_fin") != null) {
                informe.setFechaFin(
                    rs.getDate("fecha_fin").toLocalDate()
                );
            }

            informe.setDescripcion(rs.getString("descripcion"));
            informe.setJefeInmediato(rs.getString("jefe_inmediato"));
            informe.setTelefonoContacto(rs.getString("telefono_contacto"));

            if (rs.getTimestamp("fecha_registro") != null) {
                informe.setFechaRegistro(
                    rs.getTimestamp("fecha_registro").toLocalDateTime()
                );
            }

            return informe;
        });
    }
}