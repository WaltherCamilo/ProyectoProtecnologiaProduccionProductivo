package com.protecnologia.intranet.controller;

import com.protecnologia.intranet.model.CatalogoProducto;
import com.protecnologia.intranet.service.CatalogoProductoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CatalogoProductoController {

    private final CatalogoProductoService service;

    public CatalogoProductoController(CatalogoProductoService service) {
        this.service = service;
    }

    @GetMapping("/catalogo")
    public Map<String, Object> obtenerDisponibles() {

        List<CatalogoProducto> datos = service.obtenerDisponibles();

        return Map.of(
            "estado", "OK",
            "datos", datos
        );
    }
}
