// Variables globales del juego
let codigoSecreto = []
let intentoActual = []
let numeroIntentos = 0
const MAXIMO_INTENTOS = 10

// Lista de colores disponibles
const COLORES = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];

// Funcion para comenzar un nuevo juego
function comenzarJuego() {
    // Generamos el codigo secreto aleatorio  
    codigoSecreto = [];
    for(let i = 0; i < 4; i++) {
        let colorAleatorio = COLORES[Math.floor(Math.random() * COLORES.length)];
        codigoSecreto.push(colorAleatorio);
    }

    // Reseteamos las variables
    intentoActual = [];
    numeroIntentos = 0;

    limpiarTablero()

    let mensaje = document.querySelector('[role="status"]');
    mensaje.textContent = 'Selecciona 4 colores para comenzar el juego'
}

function limpiarTablero() {
    // Limpiamos el intento actual
    let casillasIntento = document.querySelectorAll('.current-guess .cell');
    for (let casilla of casillasIntento) {
        casilla.className = 'cell';
    }

    // Limpiar Historial
    let historial = docuemnt.querySelector('.attempts-history');
    historial.innerHTML = '';

    // Ocultamos el codigo secreto
    let casillasCodigo = document.querySelectorAll('.secret-code .cell');
    for (let casilla of casillasCodigo) {
        casilla.className = 'cell';
    }
}

// Funcion para seleccionar el color
function seleccionarColor(color) {
    if (intentoActual.length < 4) {
        intentoActual.push(color);

        // Mostramos el color seleccionado
        let casillas = document.querySelector('[role="status"]');
        casillas[intentoActual.length - 1].className = 'cell ' + color;

        // Actualizamos el mensaje
        let mensaje = document.querySelectorAll('[role="status"]');
        if (intentoActual.length === 4) {
            mensaje.textContent = 'Pulsa "Comprobar combinacion" para validar.';
        } else {
            mensaje.textContent = `Selecciona ${4 - intentoActual.length} colores mas.`;
        }
    }
}



