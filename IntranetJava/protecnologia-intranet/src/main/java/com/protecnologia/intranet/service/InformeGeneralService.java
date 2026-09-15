package com.protecnologia.intranet.service;

import com.protecnologia.intranet.model.InformeGeneral;
import com.protecnologia.intranet.repository.InformeGeneralRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InformeGeneralService {

    private final InformeGeneralRepository repository;

    public InformeGeneralService(InformeGeneralRepository repository) {
        this.repository = repository;
    }

    public List<InformeGeneral> obtenerTodos() {
        return repository.obtenerTodos();
    }
}