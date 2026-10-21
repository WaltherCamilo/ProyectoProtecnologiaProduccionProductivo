package com.protecnologia.intranet.service;

import com.protecnologia.intranet.model.CatalogoProducto;
import com.protecnologia.intranet.repository.CatalogoProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatalogoProductoService {

    private final CatalogoProductoRepository repository;

    public CatalogoProductoService(CatalogoProductoRepository repository) {
        this.repository = repository;
    }

    public List<CatalogoProducto> obtenerDisponibles() {
        return repository.obtenerDisponibles();
    }
}
