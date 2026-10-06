interface Servicio {
    titulo: string;
    descripcion: string;
    video: string;
}

const servicios: Servicio[] = [
    {
        titulo: "Soporte Técnico",
        descripcion: "Soluciones rápidas para equipos y sistemas.",
        video: "../videos/soporte.mp4"
    },
    {
        titulo: "Redes",
        descripcion: "Configuración y administración de redes.",
        video: "../videos/redes.mp4"
    },
    {
        titulo: "Seguridad Informática",
        descripcion: "Protección de datos y sistemas.",
        video: "../videos/seguridad.mp4"
    }
];

const listaServicios = document.getElementById("lista-servicios") as HTMLElement;

const modal = document.getElementById("videoModal") as HTMLElement;
const videoPlayer = document.getElementById("videoPlayer") as HTMLVideoElement;
const videoSource = document.getElementById("videoSource") as HTMLSourceElement;
const descripcion = document.getElementById("videoDescripcion") as HTMLElement;
const cerrar = document.querySelector(".close") as HTMLElement;

servicios.forEach(servicio => {

    const card = document.createElement("div");

    card.className = "card-servicio";

    card.innerHTML = `
        <h2>${servicio.titulo}</h2>
        <p>${servicio.descripcion}</p>
        <button>Ver video</button>
    `;

    const boton = card.querySelector("button") as HTMLButtonElement;

    boton.addEventListener("click", () => {

        videoSource.src = servicio.video;

        videoPlayer.load();

        descripcion.textContent = servicio.descripcion;

        modal.style.display = "flex";
    });

    listaServicios.appendChild(card);
});

cerrar.addEventListener("click", () => {

    modal.style.display = "none";

    videoPlayer.pause();
});