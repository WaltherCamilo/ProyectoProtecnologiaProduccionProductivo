package com.protecnologia.intranet.controller;

import com.protecnologia.intranet.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class CambiarPasswordController {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public CambiarPasswordController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @PostMapping("/cambiar-password")
    public ResponseEntity<?> cambiarPassword(
            @RequestBody CambiarPasswordRequest request) {

        try {

            if (request.correo() == null || request.correo().isBlank()) {
                return ResponseEntity.badRequest().body(
                        Map.of(
                                "estado", "ERROR",
                                "mensaje", "El correo es obligatorio"
                        )
                );
            }

            if (request.passwordNueva() == null ||
                    request.passwordNueva().length() < 8) {

                return ResponseEntity.badRequest().body(
                        Map.of(
                                "estado", "ERROR",
                                "mensaje", "La contraseña debe tener mínimo 8 caracteres"
                        )
                );
            }

            String hash = passwordEncoder.encode(request.passwordNueva());

            int actualizados = usuarioRepository.cambiarPassword(
                    request.correo().trim().toLowerCase(),
                    hash
            );

            if (actualizados == 0) {
                return ResponseEntity.status(404).body(
                        Map.of(
                                "estado", "ERROR",
                                "mensaje", "Usuario no encontrado"
                        )
                );
            }

            return ResponseEntity.ok(
                    Map.of(
                            "estado", "OK",
                            "mensaje", "Contraseña cambiada correctamente"
                    )
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.status(500).body(
                    Map.of(
                            "estado", "ERROR",
                            "mensaje", e.getClass().getName(),
                            "detalle", e.getMessage() == null
                                    ? "Sin mensaje de error"
                                    : e.getMessage()
                    )
            );
        }
    }

    public record CambiarPasswordRequest(
            String correo,
            String passwordNueva
    ) {}
}