const servicios = [
    "Soporte IT",
    "Creación páginas web",
    "Aplicaciones",
    "Venta de equipos",
    "Análisis de datos",
    "Tecnología en la nube",
    "Sistemas de tickets"
];

const contenedor = document.getElementById("lista-servicios");

servicios.forEach(servicio => {
    const div = document.createElement("div");
    div.classList.add("card-servicio");
    div.textContent = servicio;
    contenedor.appendChild(div);
});