
(() => {
    "use strict";

    // Evita crear el asistente dos veces.
    if (document.getElementById("iaBoton")) return;

    const estilos = document.createElement("style");

    estilos.textContent = `
        #iaBoton {
            position: fixed;
            right: 25px;
            bottom: 95px;
            width: 50px;
            height: 50px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 0;
            border-radius: 50%;
            background: linear-gradient(135deg, #00d4ff, #0077ff);
            color: white;
            font-size: 28px;
            cursor: pointer;
            box-shadow: 0 8px 20px #0006;
            z-index: 10001;
        }

        #iaBoton:hover {
            transform: scale(1.08);
        }

        #iaBoton::after {
            content: "Asistente IA";
            position: absolute;
            right: 60px;
            top: 50%;
            transform: translateY(-50%);
            padding: 7px 10px;
            border: 1px solid #526579;
            border-radius: 6px;
            background: #071827;
            color: white;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        #iaBoton:hover::after,
        #iaBoton:focus-visible::after {
            opacity: 1;
            visibility: visible;
        }

        #iaVentana {
            position: fixed;
            right: 25px;
            bottom: 155px;
            width: 350px;
            max-width: calc(100vw - 30px);
            height: 430px;
            max-height: calc(100vh - 180px);
            display: none;
            flex-direction: column;
            overflow: hidden;
            box-sizing: border-box;
            border: 1px solid #1e789b;
            border-radius: 14px;
            background: #0b1d30;
            color: white;
            box-shadow: 0 12px 35px #0007;
            z-index: 10002;
            font-family: Arial, sans-serif;
        }

        #iaVentana.ia-visible {
            display: flex;
        }

        #iaCabecera {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            padding: 14px;
            background: linear-gradient(135deg, #0077ff, #00bcd4);
        }

        #iaTitulo {
            font-size: 16px;
            font-weight: bold;
        }

        #iaSubtitulo {
            margin-top: 4px;
            font-size: 11px;
        }

        #iaCerrar {
            flex: 0 0 32px;
            width: 32px;
            height: 32px;
            border: 0;
            border-radius: 6px;
            background: #007fae;
            color: white;
            font-size: 22px;
            cursor: pointer;
        }

        #iaMensajes {
            flex: 1 1 auto;
            min-height: 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
            overflow-y: auto;
            padding: 14px;
        }

        .iaMensaje {
            max-width: 90%;
            padding: 10px 12px;
            border-radius: 10px;
            font-size: 13px;
            line-height: 1.5;
            white-space: pre-wrap;
            overflow-wrap: anywhere;
        }

        .iaBotMensaje {
            align-self: flex-start;
            background: #19344d;
            color: white;
        }

        .iaUsuarioMensaje {
            align-self: flex-end;
            background: #006fba;
            color: white;
        }

        .iaErrorMensaje {
            align-self: flex-start;
            background: #512a32;
            color: #ffe4e7;
        }

        /* Campo de escritura: ancho completo disponible. */
        #iaVentana form#iaFormulario {
            flex: 0 0 auto;
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 8px;
            width: 100% !important;
            min-width: 0;
            box-sizing: border-box;
            margin: 0;
            padding: 12px;
            border-top: 1px solid #284056;
            background: #0b1d30;
        }

        #iaVentana #iaEntrada {
            display: block !important;
            flex: 1 1 0% !important;
            width: 0 !important;
            min-width: 0 !important;
            height: 42px;
            box-sizing: border-box;
            margin: 0;
            padding: 10px;
            border: 1px solid #46627b;
            border-radius: 8px;
            outline: none;
            background: #122b42;
            color: white;
            font-family: Arial, sans-serif;
            font-size: 14px;
        }

        #iaVentana #iaEntrada::placeholder {
            color: #b4c4d4;
        }

        #iaVentana #iaEntrada:focus {
            border-color: #00d4ff;
        }

        #iaVentana button#iaEnviar {
            display: block !important;
            flex: 0 0 auto !important;
            width: auto !important;
            height: 42px;
            margin: 0;
            padding: 0 14px;
            border: 0;
            border-radius: 8px;
            background: #008cff;
            color: white;
            font-size: 13px;
            font-weight: bold;
            cursor: pointer;
        }

        #iaVentana #iaEnviar:disabled {
            opacity: .55;
            cursor: wait;
        }

        @media (max-width: 480px) {
            #iaVentana {
                right: 10px;
                bottom: 155px;
                width: calc(100vw - 20px);
                max-width: none;
            }

            #iaBoton {
                right: 20px;
            }
        }
    `;

    document.head.appendChild(estilos);

    // Solo crea el botón de IA; no modifica Inicio ni WhatsApp.
    const boton = document.createElement("button");
    boton.id = "iaBoton";
    boton.type = "button";
    boton.textContent = "✦";
    boton.title = "Asistente IA";
    boton.setAttribute("aria-label", "Abrir Asistente IA");
    boton.setAttribute("aria-expanded", "false");

    const ventana = document.createElement("section");
    ventana.id = "iaVentana";
    ventana.setAttribute("role", "dialog");
    ventana.setAttribute("aria-label", "Asistente IA");

    ventana.innerHTML = `
        <div id="iaCabecera">
            <div>
                <div id="iaTitulo">✦ Asistente IA</div>
                <div id="iaSubtitulo">
                    ProTecnologiaTech · Asistente virtual
                </div>
            </div>
            <button id="iaCerrar" type="button"
                    aria-label="Cerrar asistente">×</button>
        </div>

        <div id="iaMensajes" aria-live="polite">
            <div class="iaMensaje iaBotMensaje">
                ¡Hola! Soy el asistente virtual de ProTecnologiaTech.
                ¿En qué puedo ayudarte?
            </div>
        </div>

        <form id="iaFormulario">
            <input id="iaEntrada"
                   type="text"
                   placeholder="Escribe tu pregunta..."
                   autocomplete="off"
                   maxlength="2000"
                   required>
            <button id="iaEnviar" type="submit">Enviar</button>
        </form>
    `;

    document.body.appendChild(boton);
    document.body.appendChild(ventana);

    const cerrar = document.getElementById("iaCerrar");
    const formulario = document.getElementById("iaFormulario");
    const entrada = document.getElementById("iaEntrada");
    const enviar = document.getElementById("iaEnviar");
    const mensajes = document.getElementById("iaMensajes");

    function abrir() {
        ventana.classList.add("ia-visible");
        boton.setAttribute("aria-expanded", "true");
        entrada.focus();
    }

    function cerrarVentana() {
        ventana.classList.remove("ia-visible");
        boton.setAttribute("aria-expanded", "false");
        boton.focus();
    }

    function agregarMensaje(texto, clase) {
        const elemento = document.createElement("div");
        elemento.className = `iaMensaje ${clase}`;
        elemento.textContent = texto;
        mensajes.appendChild(elemento);
        mensajes.scrollTop = mensajes.scrollHeight;
        return elemento;
    }

    boton.addEventListener("click", () => {
        ventana.classList.contains("ia-visible")
            ? cerrarVentana()
            : abrir();
    });

    cerrar.addEventListener("click", cerrarVentana);

    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape" &&
            ventana.classList.contains("ia-visible")) {
            cerrarVentana();
        }
    });

    formulario.addEventListener("submit", async evento => {
        evento.preventDefault();

        const mensaje = entrada.value.trim();
        if (!mensaje) {
            entrada.focus();
            return;
        }

        agregarMensaje(mensaje, "iaUsuarioMensaje");
        entrada.value = "";
        entrada.disabled = true;
        enviar.disabled = true;

        const indicador = agregarMensaje(
            "Estoy preparando la respuesta...",
            "iaBotMensaje"
        );

        try {
            const token =
                localStorage.getItem("token") ||
                localStorage.getItem("jwtToken");

            const cabeceras = {
                "Content-Type": "application/json"
            };

            if (token) {
                cabeceras.Authorization = `Bearer ${token}`;
            }

            const respuesta = await fetch("/api/ia/chat", {
                method: "POST",
                headers: cabeceras,
                body: JSON.stringify({ mensaje })
            });

            const datos = await respuesta.json().catch(() => ({}));

            if (!respuesta.ok) {
                throw new Error(
                    datos.error ||
                    `Error HTTP ${respuesta.status}`
                );
            }

            if (!datos.respuesta) {
                throw new Error("El servidor no devolvió una respuesta.");
            }

            indicador.textContent = datos.respuesta;
        } catch (error) {
            indicador.className = "iaMensaje iaErrorMensaje";
            indicador.textContent =
                "No se pudo obtener respuesta del asistente. " +
                "Comprueba Spring Boot y Ollama. Detalle: " +
                error.message;
        } finally {
            entrada.disabled = false;
            enviar.disabled = false;
            entrada.focus();
            mensajes.scrollTop = mensajes.scrollHeight;
        }
    });
})();
