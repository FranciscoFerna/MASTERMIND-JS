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
    for (let i = 0; i < 4, i++) {
        let colorAleatorio = COLORES[Math.floor(Math.random() * COLORES.length)];
        codigoSecreto.push(colorAleatorio);
    }

    // Reseteamos las variables
    intentoActual = [];
    numeroIntentos = 0;

    // Funcion a implementar
    limpiarTablero()

    let mensaje = document.querySelector('[role="status"]');
    mensaje.textContent = 'Selecciona 4 colores para comenzar el juego'
}