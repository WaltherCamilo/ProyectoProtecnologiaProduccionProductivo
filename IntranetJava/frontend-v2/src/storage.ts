import type { Usuario } from "./types";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function obtenerToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function guardarToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

export function obtenerUsuario(): Usuario | null {
    const usuario = localStorage.getItem(USER_KEY);

    if (!usuario) {
        return null;
    }

    try {
        return JSON.parse(usuario) as Usuario;
    } catch {
        return null;
    }
}

export function guardarUsuario(usuario: Usuario): void {
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));
}

export function cerrarSesion(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}