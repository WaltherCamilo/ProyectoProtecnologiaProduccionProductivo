import { obtenerToken } from "./storage.js";
const API_BASE_URL = "http://localhost:8080/api";
export async function apiFetch(endpoint, options = {}) {
    const token = obtenerToken();
    const headers = new Headers(options.headers);
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data?.mensaje ||
            `Error HTTP ${response.status}`);
    }
    return data;
}
export async function iniciarSesion(correo, password) {
    return apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            correo,
            password
        })
    });
}
//# sourceMappingURL=api.js.map