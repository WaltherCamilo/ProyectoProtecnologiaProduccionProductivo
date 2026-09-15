package com.protecnologia.intranet.controller;

import com.protecnologia.intranet.model.InformeGeneral;
import com.protecnologia.intranet.service.InformeGeneralService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class InformeGeneralController {

    private final InformeGeneralService service;

    public InformeGeneralController(InformeGeneralService service) {
        this.service = service;
    }

    @GetMapping("/informe-general")
    public Map<String, Object> obtenerTodos() {

        List<InformeGeneral> datos = service.obtenerTodos();

        return Map.of(
                "estado", "OK",
                "datos", datos
        );
    }
}