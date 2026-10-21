package com.protecnologia.intranet.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String remitente;

    @Value("${app.url.base}")
    private String urlBase;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void enviarVerificacion(String correo, String token) {
        String enlace = urlBase
                + "/api/auth/verificar?token="
                + token;

        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setFrom(remitente);
        mensaje.setTo(correo);
        mensaje.setSubject("Verifica tu cuenta de ProTecnologiaTech");
        mensaje.setText(
                "Hola,\n\n"
                + "Para activar tu cuenta, abre este enlace:\n\n"
                + enlace
                + "\n\nEl enlace vence en 24 horas.\n"
                + "Si no solicitaste esta cuenta, ignora este mensaje."
        );

        mailSender.send(mensaje);
    }
}
