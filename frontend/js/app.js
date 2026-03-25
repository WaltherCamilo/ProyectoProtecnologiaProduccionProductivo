// Manejo de formularios
document.addEventListener("DOMContentLoaded", () => {

  const formularios = document.querySelectorAll("form");

  formularios.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputs = form.querySelectorAll("input");
      const usuario = inputs[0].value;
      const password = inputs[1].value;

      if(usuario === "" || password === ""){
        alert("Por favor completa todos los campos");
      } else {
        alert(`Bienvenido ${usuario} 🚀`);
      }
    });
  });

});