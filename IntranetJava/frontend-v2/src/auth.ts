import { iniciarSesion } from "./api";
import {
    guardarToken,
    guardarUsuario
} from "./storage";

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

    window.location.href = "panel.html";
}