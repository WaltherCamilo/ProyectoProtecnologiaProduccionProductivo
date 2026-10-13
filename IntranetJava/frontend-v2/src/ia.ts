
import { apiFetch } from "./api.js";
import { obtenerToken } from "./storage.js";

interface RespuestaIA {
    respuesta: string;
}

function configurarAsistenteIA(): void {
    const botonAbrir = document.getElementById("iaAbrir");
    const botonCerrar = document.getElementById("iaCerrar");
    const ventana = document.getElementById("iaVentana");
    const formulario = document.getElementById("iaFormulario");
    const entrada = document.getElementById("iaEntrada");
    const mensajes = document.getElementById("iaMensajes");
    const botonEnviar = document.getElementById("iaEnviar");

    if (
        !(botonAbrir instanceof HTMLButtonElement) ||
        !(botonCerrar instanceof HTMLButtonElement) ||
        !(ventana instanceof HTMLElement) ||
        !(formulario instanceof HTMLFormElement) ||
        !(entrada instanceof HTMLInputElement) ||
        !(mensajes instanceof HTMLElement) ||
        !(botonEnviar instanceof HTMLButtonElement)
    ) {
        console.error("No se encontraron los elementos del asistente IA.");
        return;
    }

    botonAbrir.addEventListener("click", () => {
        ventana.classList.add("activa");
        entrada.focus();
    });

    botonCerrar.addEventListener("click", () => {
        ventana.classList.remove("activa");
    });

function agregarMensaje(
    texto: string,
    tipo: "usuario" | "asistente"
): void {
    const contenedor = mensajes;
    if (!(contenedor instanceof HTMLElement)) {
        return;
    }

    const elemento = document.createElement("div");
    elemento.className = `ia-mensaje ${tipo}`;
    elemento.textContent = texto;
    contenedor.appendChild(elemento);
    contenedor.scrollTop = contenedor.scrollHeight;
}
    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const mensaje = entrada.value.trim();

        if (!mensaje) {
            return;
        }

        if (!obtenerToken()) {
            agregarMensaje(
                "Inicia sesión en la intranet antes de consultar al asistente.",
                "asistente"
            );
            return;
        }

        agregarMensaje(mensaje, "usuario");
        entrada.value = "";
        entrada.disabled = true;
        botonEnviar.disabled = true;

        try {
            const resultado = await apiFetch<RespuestaIA>(
                "/ia/chat",
                {
                    method: "POST",
                    body: JSON.stringify({ mensaje })
                }
            );

            agregarMensaje(resultado.respuesta, "asistente");
        } catch (error) {
            console.error("Error al consultar la IA:", error);

            agregarMensaje(
                error instanceof Error
                    ? `No se pudo obtener respuesta: ${error.message}`
                    : "No se pudo conectar con el asistente.",
                "asistente"
            );
        } finally {
            entrada.disabled = false;
            botonEnviar.disabled = false;
            entrada.focus();
        }
    });
}

export { configurarAsistenteIA };
