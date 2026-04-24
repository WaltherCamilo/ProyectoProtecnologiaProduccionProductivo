"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function login() {
    const emailInput = document.getElementById("loginUser");
    const passInput = document.getElementById("loginPass");
    const email = emailInput.value;
    const password = passInput.value;
    console.log("login ejecutándose");
    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "panel.html";
    }
    else {
        alert("Error en login");
    }
}
window.login = login;
//# sourceMappingURL=login.js.map