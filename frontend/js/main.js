// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]:not(#btnContacto)').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        if (destino) {
            destino.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// ===== VALIDACIÓN FORMULARIO =====
const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = form.querySelector('input[type="text"]').value.trim();
        const correo = form.querySelector('input[type="email"]').value.trim();
        const telefono = form.querySelector('input[type="tel"]').value.trim();
        const mensaje = form.querySelector("textarea").value.trim();

        // Validaciones
        if (nombre.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres");
            return;
        }

        if (!correo.includes("@")) {
            alert("Correo inválido");
            return;
        }

        if (telefono.length < 7) {
            alert("Teléfono inválido");
            return;
        }

        if (mensaje.length < 10) {
            alert("El mensaje es demasiado corto");
            return;
        }

        alert("Mensaje enviado correctamente ✅");

        form.reset();
    });
}


// ===== CONTADOR DE CARACTERES =====
const textarea = document.querySelector("textarea");

if (textarea) {

    const contador = document.createElement("p");
    contador.style.fontSize = "12px";
    contador.style.textAlign = "right";
    contador.style.color = "#00d4ff";

    textarea.parentNode.appendChild(contador);

    textarea.addEventListener("input", () => {
        contador.textContent = `${textarea.value.length}/500 caracteres`;

        if (textarea.value.length > 500) {
            textarea.value = textarea.value.substring(0, 500);
        }
    });
}
// ===== LOGIN =====
function toggleLogin() {
    const box = document.getElementById("loginBox");

    if (box.style.display === "block") {
        box.style.display = "none";
    } else {
        box.style.display = "block";
    }



    if (!user || !pass) {
        alert("Debes ingresar usuario y contraseña");
        return;
    }

    if (user === "admin" && pass === "1234") {
        alert("Login correcto ✅");
    } else {
        alert("Usuario no registrado ❌");
    }
}

// CERRAR AL HACER CLICK FUERA
function irRegistro() {
    window.location.href = "http://127.0.0.1:5500/frontend/register.html";
}

// LOGIN SIMPLE (SIMULADO)
function login() {
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("password").value;

    // SIMULACIÓN (luego lo conectas a BD)
    if (user === "walther" && pass === "1234") {

        // GUARDAR DATOS
        localStorage.setItem("usuario", JSON.stringify({
            nombre: "Walther Valarezo",
            area: "Tecnología",
            telefono: "3001234567"
        }));

        // REDIRECCIONAR A PANEL
        window.location.href = "http://149.202.61.82:3000/login.html";

    } else {
        alert("Usuario no registrado ❌");

        // REDIRECCIONAR A REGISTRO
        setTimeout(() => {
            window.location.href = "http://127.0.0.1:5500/frontend/register.html";
        }, 1500);
    }
}
// ===== SLIDER AUTOMÁTICO =====
const slider = document.querySelector(".slides");

let scroll = 0;

setInterval(() => {
    if (slider) {
        scroll += 320;

        if (scroll >= slider.scrollWidth) {
            scroll = 0;
        }

        slider.scrollTo({
            left: scroll,
            behavior: "smooth"
        });
    }
}, 3000);
// ===== MODAL CONTACTO =====
document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modalContacto");
    const btn = document.getElementById("btnContacto");
    const cerrar = document.querySelector(".close-contacto");

    if (!modal || !btn || !cerrar) {
        console.log("❌ Modal contacto no encontrado");
        return;
    }

    // ABRIR
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("active");
    });

    // CERRAR (X)
    cerrar.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    // CERRAR AL DAR CLICK FUERA
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

});
window.addEventListener("click", function (e) {
    const box = document.getElementById("loginBox");

    if (
        box &&
        !e.target.closest(".login-box") &&
        !e.target.closest('[onclick="toggleLogin()"]')
    ) {
        box.style.display = "none";
    }
});