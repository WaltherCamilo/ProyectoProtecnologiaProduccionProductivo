const izquierda = [
    { nombre: "Soporte IT", icono: "💻" },
    { nombre: "Creación páginas web", icono: "🌐" },
    { nombre: "Desarrollo de aplicaciones", icono: "📱" }
];

const derecha = [
    { nombre: "Venta de equipos", icono: "🖥️" },
    { nombre: "Análisis de datos", icono: "📊" },
    { nombre: "Tecnología en la nube", icono: "☁️" },
    { nombre: "Sistema de tickets", icono: "🎫" }
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

    // ✅ EVENTO AQUÍ
    div.addEventListener("click", () => abrirModal(servicio.nombre));

    colIzquierda.appendChild(div);
});

// DERECHA
derecha.forEach(servicio => {
    const div = document.createElement("div");
    div.classList.add("card-servicio");
    div.innerHTML = `${servicio.icono} ${servicio.nombre}`;

    // ✅ EVENTO AQUÍ
    div.addEventListener("click", () => abrirModal(servicio.nombre));

    colDerecha.appendChild(div);
});

// Agregar al contenedor
contenedor.appendChild(colIzquierda);
contenedor.appendChild(colDerecha);
const modal = document.getElementById("videoModal");
const video = document.getElementById("videoPlayer");
const source = document.getElementById("videoSource");
const descripcion = document.getElementById("videoDescripcion");
const acciones = document.getElementById("accionesFinal");
const closeBtn = document.querySelector(".close");
const data = {
    "Soporte IT": {
        video: "../videos/Soporte IT.mp4",
        descripcion: "Soporte técnico profesional para tu empresa."
    },
    "Creación páginas web": {
        video: "../videos/Creacion de paginas web.mp4",
        descripcion: "Desarrollamos sitios web modernos."
    },
    "Desarrollo de aplicaciones": {
        video: "../videos/Desarrollo de aplicaciones.mp4", // ⚠️ espacio final
        descripcion: "Apps robustas y escalables."
    },
    "Venta de equipos": {
        video: "../videos/Venta de equipos.mp4",
        descripcion: "Equipos tecnológicos de alta calidad."
    },
    "Análisis de datos": {
        video: "../videos/Análisis de datos.mp4",
        descripcion: "Transformamos datos en decisiones."
    },
    "Tecnología en la nube": {
        video: "../videos/Tecnología en la nube.mp4",
        descripcion: "Servicios cloud seguros y escalables."
    },
    "Sistema de tickets": {
        video: "../videos/Sistema de tickets.mp4",
        descripcion: "Gestión eficiente de incidencias."
    }
};

// CUANDO TERMINA EL VIDEO
video.addEventListener("ended", () => {
    acciones.style.display = "flex";
});

// CERRAR
closeBtn.onclick = () => {
    modal.style.display = "none";
    video.pause();
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        video.pause();
    }
};
function abrirModal(nombre) {
  const info = data[nombre];

  if (!info) return;

  source.src = info.video;
  descripcion.textContent = info.descripcion;

  video.load();
  video.play(); // 🔥 para que se reproduzca

  modal.style.display = "flex"; // 🔥 AQUÍ VA
}
const modalContacto = document.getElementById("contactModal");
const cerrarContacto = document.querySelector(".close-contacto");

// ABRIR
document.querySelectorAll('a[href="#contacto"]').forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modalContacto.style.display = "flex";
  });
});

// CERRAR
cerrarContacto.onclick = () => {
  modalContacto.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modalContacto) {
    modalContacto.style.display = "none";
  }
};
document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("modalContacto");
  const btn = document.getElementById("btnContacto");
  const close = document.querySelector(".close-contacto");

  if (!modal || !btn || !close) {
    console.log("❌ Falta un elemento:", { modal, btn, close });
    return;
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
  });

  close.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

});

 