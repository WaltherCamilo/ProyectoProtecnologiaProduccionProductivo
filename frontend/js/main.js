// ===== TODO CORREGIDO Y LIMPIO =====
alert("JS conectado");// Solo para verificar que el archivo se carga correctamente


document.addEventListener("DOMContentLoaded", () => {

    // ===== LOGIN =====
    const btnAbrir = document.getElementById("btnAbrirLogin");
    const modalLogin = document.getElementById("loginModal");
    const cerrarLogin = document.querySelector(".close-login");
    const btnLogin = document.getElementById("btnLogin");

    if (btnAbrir && modalLogin && cerrarLogin && btnLogin) {

        // ABRIR LOGIN
        btnAbrir.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("modalContacto")?.classList.remove("active");
            modalLogin.classList.add("active");
        });

        // CERRAR LOGIN (X)
        cerrarLogin.addEventListener("click", () => {
            modalLogin.classList.remove("active");
        });

        // CERRAR LOGIN FUERA
        window.addEventListener("click", (e) => {
            if (e.target === modalLogin) {
                modalLogin.classList.remove("active");
            }
        });

        // LOGIN FUNCIONAL
        btnLogin.addEventListener("click", () => {

            const user = document.getElementById("loginUser").value;
            const pass = document.getElementById("loginPass").value;
            const check = document.getElementById("terminos");

            if (!user || !pass) {
                alert("Completa los datos");
                return;
            }

            if (!check.checked) {
                alert("Debes aceptar los términos");
                return;
            }

            if (user === "walther" && pass === "1234") {
                alert("Bienvenido 🔥");

                localStorage.setItem("usuario", JSON.stringify({
                    nombre: "Walther"
                }));

                window.location.href = "http://149.202.61.82:3000/login.html";
            } else {
                alert("Datos incorrectos ❌");
            }

        });
    }

    // ===== CONTACTO MINI =====
    const btnContacto = document.getElementById("btnContacto");
    const modalMini = document.getElementById("miniContacto");
    const cerrarMini = document.querySelector(".cerrar-mini");
    const btnEnviarMini = document.getElementById("btnEnviarMini");

    if (btnContacto && modalMini && cerrarMini && btnEnviarMini) {

        // ABRIR MINI CONTACTO
        btnContacto.addEventListener("click", (e) => {
            e.preventDefault();
            modalMini.classList.add("active");
        });

        // CERRAR (X)
        cerrarMini.addEventListener("click", () => {
            modalMini.classList.remove("active");
        });

        // CERRAR FUERA
        window.addEventListener("click", (e) => {
            if (e.target === modalMini) {
                modalMini.classList.remove("active");
            }
        });

        // ENVIAR
        btnEnviarMini.addEventListener("click", () => {

            const nombre = document.getElementById("miniNombre").value;
            const correo = document.getElementById("miniCorreo").value;
            const mensaje = document.getElementById("miniMensaje").value;

            if (!nombre || !correo || !mensaje) {
                alert("Completa todos los campos");
                return;
            }

            alert("Tu sugerencia ha sido enviada ✅");

            modalMini.classList.remove("active");

            document.getElementById("miniNombre").value = "";
            document.getElementById("miniCorreo").value = "";
            document.getElementById("miniMensaje").value = "";
        });

    }

});
// ===== REGISTRO MODAL =====
const btnRegistro = document.getElementById("btnRegistro");
const modalRegistro = document.getElementById("modalRegistro");
const cerrarRegistro = document.querySelector(".close-registro");
const btnEnviarRegistro = document.getElementById("btnEnviarRegistro");

if (btnRegistro && modalRegistro && cerrarRegistro) {

  // ABRIR
  btnRegistro.addEventListener("click", (e) => {
    e.preventDefault();
    modalRegistro.classList.add("active");
  });

  // CERRAR
  cerrarRegistro.addEventListener("click", () => {
    modalRegistro.classList.remove("active");
  });

  // CERRAR FUERA
  window.addEventListener("click", (e) => {
    if (e.target === modalRegistro) {
      modalRegistro.classList.remove("active");
    }
  });

  // REGISTRO
  btnEnviarRegistro.addEventListener("click", () => {
    const nombre = document.getElementById("regNombre").value;
    const correo = document.getElementById("regCorreo").value;
    const pass = document.getElementById("regPass").value;

    if (!nombre || !correo || !pass) {
      alert("Completa todos los campos");
      return;
    }

    alert("Registro exitoso ✅");

    modalRegistro.classList.remove("active");

    // limpiar
    document.getElementById("regNombre").value = "";
    document.getElementById("regCorreo").value = "";
    document.getElementById("regPass").value = "";
  });

}