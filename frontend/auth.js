// REGISTRO
document.getElementById("registroForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        nombre: document.getElementById("nombre").value,
        identificacion: document.getElementById("identificacion").value,
        telefono: document.getElementById("telefono").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        rol: document.getElementById("rol").value,
        aceptarLey: document.getElementById("ley").checked
    };

    const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.mensaje);
});


// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.rol === "empleado") {
        window.location.href = "empleado.html";
    } else {
        window.location.href = "cliente.html";
    }
});
function volverInicio() {
    window.location.href = "http://127.0.0.1:5500/frontend/index.html";
}