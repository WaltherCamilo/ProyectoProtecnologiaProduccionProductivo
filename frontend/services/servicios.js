const izquierda = [
    { nombre: "Soporte IT", icono: "💻" },
    { nombre: "Creación páginas web", icono: "🌐" },
    { nombre: "Aplicaciones", icono: "📱" }
];

const derecha = [
    { nombre: "Venta de equipos", icono: "🖥️" },
    { nombre: "Análisis de datos", icono: "📊" },
    { nombre: "Tecnología en la nube", icono: "☁️" },
    { nombre: "Sistemas de tickets", icono: "🎫" }
];

const contenedor = document.getElementById("lista-servicios");

// Crear columnas
const colIzquierda = document.createElement("div");
const colDerecha = document.createElement("div");

colIzquierda.classList.add("columna");
colDerecha.classList.add("columna");

// IZQUIERDA
izquierda.forEach(servicio => {
    const div = document.createElement("div");
    div.classList.add("card-servicio");
    div.innerHTML = `${servicio.icono} ${servicio.nombre}`;
    colIzquierda.appendChild(div);
});

// DERECHA
derecha.forEach(servicio => {
    const div = document.createElement("div");
    div.classList.add("card-servicio");
    div.innerHTML = `${servicio.icono} ${servicio.nombre}`;
    colDerecha.appendChild(div);
});

// Agregar al contenedor
contenedor.appendChild(colIzquierda);
contenedor.appendChild(colDerecha);