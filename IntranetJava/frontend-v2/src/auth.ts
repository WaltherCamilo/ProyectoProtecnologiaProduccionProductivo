import { iniciarSesion } from "./api.js";
import {
    guardarToken,
    guardarUsuario
} from "./storage.js";

export async function login(
    correo: string,
    password: string
): Promise<void> {

    const respuesta = await iniciarSesion(
        correo,
        password
    );

    if (respuesta.estado !== "OK") {
        throw new Error(
            respuesta.mensaje ||
            "Correo o contraseña incorrectos"
        );
    }

    if (!respuesta.token || !respuesta.usuario) {
        throw new Error(
            "La respuesta del servidor está incompleta"
        );
    }

    guardarToken(respuesta.token);
    guardarUsuario(respuesta.usuario);

    window.location.href = "http://localhost:8080/panel.html";
}