package com.protecnologia.intranet.controller;

import com.protecnologia.intranet.model.ExperienciaLaboral;
import com.protecnologia.intranet.service.ExperienciaLaboralService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ExperienciaLaboralController {

    private final ExperienciaLaboralService service;

    public ExperienciaLaboralController(ExperienciaLaboralService service) {
        this.service = service;
    }

    @GetMapping("/experiencia")
    public Map<String, Object> obtenerTodas() {

        List<ExperienciaLaboral> datos = service.obtenerTodas();

        return Map.of(
                "estado", "OK",
                "datos", datos
        );
    }
}