package com.protecnologia.intranet.service;

import com.protecnologia.intranet.model.ExperienciaAcademica;
import com.protecnologia.intranet.repository.ExperienciaAcademicaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienciaAcademicaService {

    private final ExperienciaAcademicaRepository repository;

    public ExperienciaAcademicaService(ExperienciaAcademicaRepository repository) {
        this.repository = repository;
    }

    public List<ExperienciaAcademica> obtenerTodas() {
        return repository.obtenerTodas();
    }
}