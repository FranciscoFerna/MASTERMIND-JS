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

// Función para validar el intento del usuario
function validaColoresUsuario() {
    // Comprobamos que se han seleccionado 4 colores
    if (intentoActual.length !== 4) {
        alert('Debes seleccionar 4 colores antes de comprobar');
        return;
    }

    numeroIntentos++

    // Contamos aciertos exactos y colores correctos
    let exactos = 0;
    let coloresCorrectos = 0;

    // Copias de los arrays para no modificar los originales
    let codigoCopia = [...codigoSecreto];
    let intentoCopia = [...intentoActual];

    // Primero contaremos los aciertos exactos
    for (let i = 0; i < 4; i++) {
        if (intentoCopia[i] === codigoCopia[i]) {
            exactos++;
            // Marcar como usado
            codigoCopia[i] = null;
            intentoCopia[i] = null
        }
    }

    // Luego contamos colores correctos en posicion incorrecta
    for (let i = 0; i < 4; i++) {
        if (intentoCopia[i] !== null) {
            let posicion = codigoCopia.indexOf(intentoCopia[i]);
            if (posicion !== -1) {
                coloresCorrectos++;
                codigoCopia[posicion] = null
            }
        }
    }

    // Añadimos el intento al historial
    agregarIntentoAlHistorial(exactos, coloresCorrectos);

    // Comprobamos si ha ganado
    if (exactos === 4) {
        finalizarJuegoGanado();
        return;
    }

    // Comprobamos si ha perdido
    if (numeroIntentos >= MAXIMO_INTENTOS) {
        finalizarJuegoPerdido();
        return;
    }

    //Preparamos el siguiente intento
    intentoActual = [];
    let casillas = document.querySelectorAll('.current-guess .cell');
    for (let casilla of casillas) {
        casilla.className = 'cell'
    }


    // Actualizamos el mensaje
    let mensaje = document.querySelector('[role="status"]');
    mensaje.textContent = `Intento ${numeroIntentos} de ${MAXIMO_INTENTOS}. Selecciona tu proxima combinacion.`;
}


