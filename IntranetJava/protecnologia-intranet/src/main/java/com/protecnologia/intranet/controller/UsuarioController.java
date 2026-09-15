package com.protecnologia.intranet.controller;

import com.protecnologia.intranet.service.UsuarioService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping("/existe")
    public String existeCorreo(@RequestParam String correo) {

        try {
            boolean existe = service.existeCorreo(correo);
            return "OK - existe=" + existe;

        } catch (Exception e) {
            return "ERROR: " + e.getClass().getName()
                    + " | " + e.getMessage();
        }
    }
}