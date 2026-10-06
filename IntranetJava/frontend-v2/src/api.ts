import type { LoginResponse } from "./types";
import { obtenerToken } from "./storage.js";

const API_BASE_URL = "http://localhost:8080/api";

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {

    const token = obtenerToken();

    const headers = new Headers(options.headers);

    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.mensaje ||
            `Error HTTP ${response.status}`
        );
    }

    return data as T;
}

export async function iniciarSesion(
    correo: string,
    password: string
): Promise<LoginResponse> {

    return apiFetch<LoginResponse>(
        "/auth/login",
        {
            method: "POST",
            body: JSON.stringify({
                correo,
                password
            })
        }
    );
}