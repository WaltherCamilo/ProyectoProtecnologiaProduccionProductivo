package com.protecnologia.intranet.repository;

import com.protecnologia.intranet.model.CatalogoProducto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CatalogoProductoRepository {

    private final JdbcTemplate jdbcTemplate;

    public CatalogoProductoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<CatalogoProducto> obtenerDisponibles() {

        String sql = """
            SELECT
                p.id,
                p.categoria_id,
                p.nombre,
                p.descripcion,
                p.tipo,
                p.precio,
                p.imagen_url,
                p.disponible,
                p.fecha_registro
            FROM dbo.CatalogoProductos p
            LEFT JOIN dbo.CategoriasCatalogo c
                ON c.id = p.categoria_id
            WHERE p.disponible = 1
            ORDER BY
                CASE c.nombre
                    WHEN N'Computadores' THEN 1
                    WHEN N'Tablets' THEN 2
                    WHEN N'Servidores' THEN 3
                    WHEN N'Accesorios para equipos de cómputo' THEN 4
                    WHEN N'Celulares' THEN 5
                    ELSE 6
                END,
                p.nombre ASC
            """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            CatalogoProducto producto = new CatalogoProducto();

            producto.setId(rs.getInt("id"));

            int categoriaId = rs.getInt("categoria_id");
            if (!rs.wasNull()) {
                producto.setCategoriaId(categoriaId);
            }

            producto.setNombre(rs.getString("nombre"));
            producto.setDescripcion(rs.getString("descripcion"));
            producto.setTipo(rs.getString("tipo"));
            producto.setPrecio(rs.getBigDecimal("precio"));
            producto.setImagenUrl(rs.getString("imagen_url"));
            producto.setDisponible(rs.getBoolean("disponible"));

            if (rs.getTimestamp("fecha_registro") != null) {
                producto.setFechaRegistro(
                    rs.getTimestamp("fecha_registro").toLocalDateTime()
                );
            }

            return producto;
        });
    }
}
