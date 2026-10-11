const botonInicio = document.getElementById("botonInicio");
const botonNotificaciones = document.getElementById("botonNotificaciones");

const contador = document.getElementById("contador");
const listaNotificaciones = document.getElementById("listaNotificaciones");
const contenedorNotificaciones = document.getElementById("notificaciones");
const sinNotificaciones = document.getElementById("sinNotificaciones");
const estado = document.getElementById("estado");

let iniciado = false;
let teclasPresionadas = 0;
let numeroNotificaciones = 0;

// Iniciar el sistema
botonInicio.addEventListener("click", function () {
    iniciado = true;

    // Efecto visual de botón presionado
    botonInicio.classList.add("presionado");

    estado.textContent = "¡Sistema iniciado! Escribe para generar notificaciones.";

    // Retirar el efecto después de un instante
    setTimeout(function () {
        botonInicio.classList.remove("presionado");
    }, 180);
});

// Contar las teclas presionadas después de iniciar
document.addEventListener("keydown", function (evento) {
    if (!iniciado) {
        return;
    }

    // Ignorar teclas modificadoras
    if (
        evento.key === "Shift" ||
        evento.key === "Control" ||
        evento.key === "Alt" ||
        evento.key === "Meta"
    ) {
        return;
    }

    teclasPresionadas++;

    // Generar una notificación cada tres teclas
    if (teclasPresionadas % 3 === 0) {
        crearNotificacion();
    }
});

// Crear una notificación
function crearNotificacion() {
    numeroNotificaciones++;

    // Actualizar el contador
    contador.textContent = numeroNotificaciones;
    contador.hidden = false;

    // Crear el elemento de la lista
    const notificacion = document.createElement("li");
    notificacion.textContent = `Notificación ${numeroNotificaciones}`;

    contenedorNotificaciones.prepend(notificacion);

    sinNotificaciones.hidden = true;
}

// Abrir o cerrar el menú de notificaciones
botonNotificaciones.addEventListener("click", function () {
    const estaAbierto = !listaNotificaciones.hidden;

    listaNotificaciones.hidden = estaAbierto;
    botonNotificaciones.setAttribute("aria-expanded", String(!estaAbierto));
});

// Cerrar el menú si se hace clic fuera de él
document.addEventListener("click", function (evento) {
    if (!evento.target.closest(".zona-notificaciones")) {
        listaNotificaciones.hidden = true;
        botonNotificaciones.setAttribute("aria-expanded", "false");
    }
});