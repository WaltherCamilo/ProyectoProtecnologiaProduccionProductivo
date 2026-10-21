package com.protecnologia.intranet.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CatalogoProducto {

    private int id;
    private Integer categoriaId;
    private String nombre;
    private String descripcion;
    private String tipo;
    private BigDecimal precio;
    private String imagenUrl;
    private boolean disponible;
    private LocalDateTime fechaRegistro;

    public CatalogoProducto() {
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public Integer getCategoriaId() { return categoriaId; }
    public void setCategoriaId(Integer categoriaId) {
        this.categoriaId = categoriaId;
    }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }

    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public boolean isDisponible() { return disponible; }
    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }
}
