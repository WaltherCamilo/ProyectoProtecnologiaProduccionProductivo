
package com.protecnologia.intranet.controller;

import com.protecnologia.intranet.service.OllamaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ia")
public class IaController {

    private final OllamaService ollamaService;

    public IaController(OllamaService ollamaService) {
        this.ollamaService = ollamaService;
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(
            @RequestBody Map<String, String> solicitud) {

        String mensaje = solicitud.get("mensaje");

        if (mensaje == null || mensaje.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "error",
                            "El mensaje no puede estar vacío."
                    ));
        }

        String respuesta = ollamaService.preguntar(mensaje);

        return ResponseEntity.ok(
                Map.of("respuesta", respuesta)
        );
    }
}
