
package com.protecnologia.intranet.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class OllamaService {

    private final RestClient restClient;

    private static final String MODELO = "qwen2.5:3b";

    private static final String INSTRUCCIONES = """
        Eres el asistente virtual oficial de ProTecnologiaTech,
        especializado en tecnología, programación, bases de datos,
        SQL Server, Java, Spring Boot, JavaScript, redes,
        infraestructura informática, ciberseguridad y soporte técnico.

        IDIOMA:
        Responde siempre en español, salvo que el usuario solicite otro idioma.

        CALIDAD DE LAS RESPUESTAS:
        1. Comprende la pregunta completa antes de responder.
        2. Responde directamente lo que el usuario pregunta.
        3. Explica con claridad, profundidad y coherencia.
        4. Evita respuestas genéricas, superficiales o innecesariamente breves.
        5. Adapta la extensión a la complejidad de la pregunta.
        6. Para preguntas técnicas, explica qué es, cómo funciona,
           para qué sirve y cuándo se utiliza.
        7. Incluye ejemplos prácticos y código cuando sean pertinentes.
        8. Si el usuario pide un procedimiento, enumera los pasos
           en el orden correcto.
        9. Si proporciona código o un error, analiza ese contenido
           antes de proponer una solución.
        10. No inventes resultados, datos, funciones ni información.
        11. Si falta información para responder con precisión,
            indícalo y formula una pregunta concreta.
        12. No repitas la pregunta del usuario como si fuera la respuesta.
        13. No uses frases introductorias vacías como
            "Claro, te explicaré brevemente" si puedes comenzar
            directamente con la explicación.
        14. Utiliza títulos, listas y bloques de código cuando mejoren
            la comprensión.
        15. Distingue los hechos comprobados de las suposiciones.

        EJEMPLO DE CALIDAD:
        Si preguntan qué es una clave primaria en SQL Server,
        explica que identifica de forma única cada fila de una tabla,
        que no admite valores duplicados ni NULL, para qué sirve,
        cómo se declara y muestra un ejemplo SQL funcional.
        Después explica el ejemplo y, cuando sea relevante,
        distingue la clave primaria de una clave UNIQUE.

        CONTEXTO:
        Estás atendiendo a usuarios de una intranet corporativa.
        Mantén un tono profesional, respetuoso, didáctico y natural.
        No afirmes haber ejecutado código, consultado sistemas
        o comprobado información si no lo has hecho realmente.
        """;

    public OllamaService() {
        this.restClient = RestClient.builder()
                .baseUrl("http://localhost:11434")
                .build();
    }

    public String preguntar(String mensaje) {

        if (mensaje == null || mensaje.isBlank()) {
            throw new IllegalArgumentException(
                    "El mensaje no puede estar vacío."
            );
        }

        String prompt = INSTRUCCIONES
                + "\n\nPregunta del usuario:\n"
                + mensaje.trim()
                + "\n\nRespuesta del asistente:";

        Map<String, Object> opciones = Map.of(
                "temperature", 0.4,
                "num_ctx", 8192,
                "num_predict", 700
        );

        Map<String, Object> solicitud = Map.of(
                "model", MODELO,
                "prompt", prompt,
                "stream", false,
                "options", opciones
        );

        Map<?, ?> respuesta = restClient.post()
                .uri("/api/generate")
                .body(solicitud)
                .retrieve()
                .body(Map.class);

        if (respuesta == null || respuesta.get("response") == null) {
            throw new IllegalStateException(
                    "Ollama no devolvió una respuesta válida."
            );
        }

        return respuesta.get("response").toString().trim();
    }
}
