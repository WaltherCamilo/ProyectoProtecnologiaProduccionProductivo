package com.protecnologia.intranet.service;

import com.protecnologia.intranet.model.ExperienciaLaboral;
import com.protecnologia.intranet.repository.ExperienciaLaboralRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienciaLaboralService {

    private final ExperienciaLaboralRepository repository;

    public ExperienciaLaboralService(ExperienciaLaboralRepository repository) {
        this.repository = repository;
    }

    public List<ExperienciaLaboral> obtenerTodas() {
        return repository.obtenerTodas();
    }
}