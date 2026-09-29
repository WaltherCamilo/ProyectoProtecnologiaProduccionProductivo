export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    rol: "ADMINISTRADOR" | "EMPLEADO";
}

export interface LoginResponse {
    estado: string;
    mensaje?: string;
    token?: string;
    usuario?: Usuario;
}