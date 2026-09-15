package com.protecnologia.intranet.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey secretKey;

    public JwtService(@Value("${jwt.secret}") String secret) {

        if (secret == null || secret.length() < 32) {
            throw new IllegalArgumentException(
                "JWT_SECRET debe tener mínimo 32 caracteres"
            );
        }

        this.secretKey = Keys.hmacShaKeyFor(
            secret.getBytes(StandardCharsets.UTF_8)
        );
    }

    public String generarToken(Integer id, String correo, String rol) {

        return Jwts.builder()
            .subject(correo)
            .claim("id", id)
            .claim("rol", rol)
            .issuedAt(new Date())
            .expiration(new Date(
                System.currentTimeMillis() + 1000L * 60 * 60 * 8
            ))
            .signWith(secretKey)
            .compact();
    }

    public Claims validarToken(String token) {

        return Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    public String obtenerCorreo(String token) {
        return validarToken(token).getSubject();
    }

    public String obtenerRol(String token) {
        return validarToken(token).get("rol", String.class);
    }

    public Integer obtenerId(String token) {
        return validarToken(token).get("id", Integer.class);
    }
}