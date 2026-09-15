document.addEventListener("DOMContentLoaded", () => {
    cargarExperienciaLaboral();
    cargarFormacionAcademica();
    cargarInformacionGeneral();
});

async function cargarExperienciaLaboral() {
    try {
        const respuesta = await fetch("/api/experiencia");
        
        if (!respuesta.ok) {
            throw new Error("Error HTTP " + respuesta.status);
        }

        const datos = await respuesta.json();

        const contenedor = document.querySelector("#experiencia-laboral");

        if (!contenedor) return;

        contenedor.innerHTML = "";

        datos.forEach(item => {
            const elemento = document.createElement("div");

            elemento.innerHTML = `
                <h3>${item.cargo || ""}</h3>
                <p><strong>${item.empresa || ""}</strong></p>
                <p>${item.ciudad || ""}</p>
                <p>${item.descripcion || ""}</p>
                <p>
                    ${item.fechaInicio || ""} -
                    ${item.fechaFin || "Actualidad"}
                </p>
                <hr>
            `;

            contenedor.appendChild(elemento);
        });

    } catch (error) {
        console.error("Error cargando experiencia laboral:", error);
    }
}

async function cargarFormacionAcademica() {
    try {
        const respuesta = await fetch("/api/experiencia-academica");

        if (!respuesta.ok) {
            throw new Error("Error HTTP " + respuesta.status);
        }

        const datos = await respuesta.json();

        const contenedor = document.querySelector("#formacion-academica");

        if (!contenedor) return;

        contenedor.innerHTML = "";

        datos.forEach(item => {
            const elemento = document.createElement("div");

            elemento.innerHTML = `
                <h3>${item.nombre || ""}</h3>
                <p><strong>${item.institucion || ""}</strong></p>
                <p>${item.tecnologia || ""}</p>
                <p>${item.descripcion || ""}</p>
                <p>
                    ${item.fechaInicio || ""} -
                    ${item.fechaFin || "Actualidad"}
                </p>
                <hr>
            `;

            contenedor.appendChild(elemento);
        });

    } catch (error) {
        console.error("Error cargando formación académica:", error);
    }
}

async function cargarInformacionGeneral() {
    try {
        const respuesta = await fetch("/api/informe-general");

        if (!respuesta.ok) {
            throw new Error("Error HTTP " + respuesta.status);
        }

        const datos = await respuesta.json();

        const contenedor = document.querySelector("#informacion-general");

        if (!contenedor) return;

        contenedor.innerHTML = "";

        datos.forEach(item => {
            const elemento = document.createElement("div");

            elemento.innerHTML = `
                <h3>${item.cargo || ""}</h3>
                <p><strong>${item.empresa || ""}</strong></p>
                <p>${item.ciudad || ""}</p>
                <p>${item.descripcion || ""}</p>
                <p>
                    ${item.fechaInicio || ""} -
                    ${item.fechaFin || "Actualidad"}
                </p>
                <p>
                    Jefe: ${item.jefeInmediato || ""}
                </p>
                <p>
                    Contacto: ${item.telefonoContacto || ""}
                </p>
                <hr>
            `;

            contenedor.appendChild(elemento);
        });

    } catch (error) {
        console.error("Error cargando información general:", error);
    }
}

function logout() {
    window.location.href = "index.html";
}