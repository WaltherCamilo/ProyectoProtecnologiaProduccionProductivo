const TOKEN_KEY = "token";
const USER_KEY = "user";
export function obtenerToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function guardarToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}
export function obtenerUsuario() {
    const usuario = localStorage.getItem(USER_KEY);
    if (!usuario) {
        return null;
    }
    try {
        return JSON.parse(usuario);
    }
    catch {
        return null;
    }
}
export function guardarUsuario(usuario) {
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));
}
export function cerrarSesion() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}
//# sourceMappingURL=storage.js.map