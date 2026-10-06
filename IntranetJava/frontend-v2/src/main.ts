import { login } from "./auth.js";

function configurarModalLogin(): void {

    const botonAbrir = document.getElementById("btnAbrirLogin");
    const modal = document.getElementById("loginModal");
    const botonCerrar = document.querySelector(".close-login");

    if (!botonAbrir || !modal || !botonCerrar) {
        console.error(
            "No se encontraron los elementos del modal de login."
        );

        return;
    }

    botonAbrir.addEventListener("click", (evento) => {

        evento.preventDefault();

        modal.classList.add("active");
    });

    botonCerrar.addEventListener("click", () => {

        modal.classList.remove("active");
    });
}

function configurarLogin(): void {

    const botonLogin = document.querySelector(
        '#btnLogin'
    );

    if (!(botonLogin instanceof HTMLButtonElement)) {
        console.error(
            "No se encontró el botón de login."
        );

        return;
    }

    botonLogin.addEventListener("click", async (evento) => {

        evento.preventDefault();

        const usuario =
            document.getElementById("loginUser");

        const contraseña =
            document.getElementById("loginPass");

        if (
            !(usuario instanceof HTMLInputElement) ||
            !(contraseña instanceof HTMLInputElement)
        ) {
            alert("Campos de login no encontrados");
            return;
        }

        const correo = usuario.value.trim();
        const password = contraseña.value;

        if (!correo || !password) {
            alert(
                "Completa el correo y la contraseña"
            );

            return;
        }

        try {

            await login(correo, password);

            alert(
                "Inicio de sesión correcto"
            );

        } catch (error) {

            console.error(
                "Error durante el inicio de sesión:",
                error
            );

            alert(
                error instanceof Error
                    ? error.message
                    : "No se pudo conectar con el servidor de la intranet."
            );
        }
    });
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        configurarModalLogin();
        configurarLogin();
    }
);
