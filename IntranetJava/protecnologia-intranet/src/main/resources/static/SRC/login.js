"use strict";

async function login() {

    const emailInput = document.getElementById("loginUser");
    const passInput = document.getElementById("loginPass");

    const correo = emailInput.value.trim();
    const password = passInput.value;

    if (!correo || !password) {
        alert("Ingrese el correo y la contraseña");
        return;
    }

    console.log("Login ejecutándose...");

    try {

        const res = await fetch("http://192.168.2.14:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                correo: correo,
                password: password
            })
        });

        const data = await res.json();

        console.log("Respuesta del servidor:", data);

        if (data.estado === "OK") {

            localStorage.setItem(
                "user",
                JSON.stringify(data.usuario)
            );

            window.location.href = "panel.html";

        } else {

            alert(data.mensaje || "Error en el inicio de sesión");
        }

    } catch (error) {

        console.error("Error de conexión:", error);

        alert(
            "No se pudo conectar con el servidor de la intranet."
        );
    }
}

window.login = login;