package com.protecnologia.intranet.controller;

import com.protecnologia.intranet.model.Usuario;
import com.protecnologia.intranet.service.AuthService;
import com.protecnologia.intranet.service.EmailService;
import com.protecnologia.intranet.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;
    private final EmailService emailService;

    public AuthController(
            AuthService authService,
            JwtService jwtService,
            EmailService emailService
    ) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.emailService = emailService;
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
                                "mensaje", "La contraseÃ±a debe tener mÃ­nimo 8 caracteres"
                        )
                );
            }

            String correo = request.correo().trim().toLowerCase();

            String token = authService.registrar(
                    request.nombre().trim(),
                    request.apellido().trim(),
                    correo,
                    request.password()
            );

            try {
                emailService.enviarVerificacion(correo, token);
            } catch (Exception errorCorreo) {
                System.err.println(
                        "Fallo de envío SMTP: "
                        + errorCorreo.getClass().getSimpleName()
                        + " - " + errorCorreo.getMessage()
                );

                Throwable causa = errorCorreo.getCause();
                int nivel = 0;
                while (causa != null && nivel < 5) {
                    System.err.println(
                            "Causa SMTP " + (nivel + 1) + ": "
                            + causa.getClass().getSimpleName()
                            + " - " + causa.getMessage()
                    );
                    causa = causa.getCause();
                    nivel++;
                }
                return ResponseEntity.status(503).body(
                        Map.of(
                                "estado", "ERROR",
                                "mensaje", "La cuenta fue creada, pero no se pudo enviar el correo de verificaciÃ³n. Contacta al administrador para activar tu cuenta."
                        )
                );
            }

            return ResponseEntity.ok(
                    Map.of(
                            "estado", "OK",
                            "mensaje", "Registro creado. Revisa tu correo para activar la cuenta."
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
                                "mensaje", "La contraseÃ±a es obligatoria"
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
                            "mensaje", "Inicio de sesiÃ³n correcto",
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

    @PostMapping("/reenviar-verificacion")
    public ResponseEntity<?> reenviarVerificacion(@RequestBody ReenvioRequest request) {
        String mensaje = "Si la cuenta existe y está pendiente de activación, recibirás un correo de verificación.";
        try {
            if (request.correo() == null || request.correo().isBlank()) {
                return ResponseEntity.badRequest().body(
                    Map.of("estado", "ERROR", "mensaje", "El correo es obligatorio")
                );
            }
            String correo = request.correo().trim().toLowerCase();
            String token = authService.reenviarVerificacion(correo);
            emailService.enviarVerificacion(correo, token);
            return ResponseEntity.ok(Map.of("estado", "OK", "mensaje", mensaje));
        } catch (Exception e) {
            System.err.println("Error en reenvío: " + e.getClass().getSimpleName());
            return ResponseEntity.ok(Map.of("estado", "OK", "mensaje", mensaje));
        }
    }

    public record ReenvioRequest(String correo) {}
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
                        "mensaje", "Token invÃ¡lido o expirado"
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
