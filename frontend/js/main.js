// ===== TODO CORREGIDO Y LIMPIO =====
alert("JS conectado");
document.addEventListener("DOMContentLoaded", () => {

  const btnAbrir = document.getElementById("btnAbrirLogin");
  const modalLogin = document.getElementById("loginModal");
  const cerrarLogin = document.querySelector(".close-login");
  const btnLogin = document.getElementById("btnLogin");

  if (!btnAbrir || !modalLogin || !cerrarLogin) {
    console.log("❌ ERROR: login no conectado");
    return;
  }

  // ABRIR
  btnAbrir.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("modalContacto")?.classList.remove("active");
    modalLogin.classList.add("active");
  });

  // CERRAR (X)
  cerrarLogin.addEventListener("click", () => {
    modalLogin.classList.remove("active");
  });

  // CERRAR FUERA
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

});