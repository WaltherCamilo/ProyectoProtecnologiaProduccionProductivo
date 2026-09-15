package com.protecnologia.intranet.controller;

import com.protecnologia.intranet.model.ExperienciaAcademica;
import com.protecnologia.intranet.service.ExperienciaAcademicaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ExperienciaAcademicaController {

    private final ExperienciaAcademicaService service;

    public ExperienciaAcademicaController(ExperienciaAcademicaService service) {
        this.service = service;
    }

    @GetMapping("/experiencia-academica")
    public Map<String, Object> obtenerTodas() {

        List<ExperienciaAcademica> datos = service.obtenerTodas();

        return Map.of(
                "estado", "OK",
                "datos", datos
        );
    }
}