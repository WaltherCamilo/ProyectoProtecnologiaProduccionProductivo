package com.protecnologia.intranet.controller;

import com.protecnologia.intranet.model.Usuario;
import com.protecnologia.intranet.service.AuthService;
import com.protecnologia.intranet.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(
            AuthService authService,
            JwtService jwtService
    ) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(
            @RequestBody RegistroRequest request
    ) {

        try {

            if (request.nombre() == null || request.nombre().isBlank()) {
                return ResponseEntity.badRequest().body(
                        Map.of(
                                "estado", "ERROR",
                                "mensaje", "El nombre es obligatorio"
                        )
                );
            }

            if (request.apellido() == null || request.apellido().isBlank()) {
                return ResponseEntity.badRequest().body(
                        Map.of(
                                "estado", "ERROR",
                                "mensaje", "El apellido es obligatorio"
                        )
                );
            }

            if (request.correo() == null || request.correo().isBlank()) {
                return ResponseEntity.badRequest().body(
                        Map.of(
                                "estado", "ERROR",
                                "mensaje", "El correo es obligatorio"
                        )
                );
            }

            if (request.password() == null || request.password().length() < 8) {
                return ResponseEntity.badRequest().body(
                        Map.of(
                                "estado", "ERROR",
                                "mensaje", "La contraseña debe tener mínimo 8 caracteres"
                        )
                );
            }

            String token = authService.registrar(
                    request.nombre().trim(),
                    request.apellido().trim(),
                    request.correo().trim().toLowerCase(),
                    request.password()
            );

            return ResponseEntity.ok(
                    Map.of(
                            "estado", "OK",
                            "mensaje", "Usuario registrado correctamente",
                            "token", token
                    )
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "estado", "ERROR",
                            "mensaje", e.getMessage()
                    )
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        try {

            if (request.correo() == null || request.correo().isBlank()) {
                return ResponseEntity.badRequest().body(
                        Map.of(
                                "estado", "ERROR",
                                "mensaje", "El correo es obligatorio"
                        )
                );
            }

            if (request.password() == null || request.password().isBlank()) {
                return ResponseEntity.badRequest().body(
                        Map.of(
                                "estado", "ERROR",
                                "mensaje", "La contraseña es obligatoria"
                        )
                );
            }

            Usuario usuario = authService.login(
                    request.correo().trim().toLowerCase(),
                    request.password()
            );

            String token = jwtService.generarToken(
                    usuario.getId(),
                    usuario.getCorreo(),
                    usuario.getRol()
            );

            return ResponseEntity.ok(
                    Map.of(
                            "estado", "OK",
                            "mensaje", "Inicio de sesión correcto",
                            "token", token,
                            "usuario", Map.of(
                                    "id", usuario.getId(),
                                    "nombre", usuario.getNombre(),
                                    "apellido", usuario.getApellido(),
                                    "correo", usuario.getCorreo(),
                                    "rol", usuario.getRol()
                            )
                    )
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity.status(401).body(
                    Map.of(
                            "estado", "ERROR",
                            "mensaje", e.getMessage()
                    )
            );
        }
    }

    @GetMapping("/verificar")
    public ResponseEntity<?> verificar(
            @RequestParam String token
    ) {

        boolean resultado = authService.verificarToken(token);

        if (resultado) {

            return ResponseEntity.ok(
                    Map.of(
                            "estado", "OK",
                            "mensaje", "Cuenta activada correctamente"
                    )
            );
        }

        return ResponseEntity.badRequest().body(
                Map.of(
                        "estado", "ERROR",
                        "mensaje", "Token inválido o expirado"
                )
        );
    }

    public record RegistroRequest(
            String nombre,
            String apellido,
            String correo,
            String password
    ) {}

    public record LoginRequest(
            String correo,
            String password
    ) {}
}