// Variables globales del juego
let codigoSecreto = []
let intentoActual = []
let numeroIntentos = 0
const MAXIMO_INTENTOS = 10

// Lista de colores disponibles
const COLORES = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];

// Esperamos a que cargue la pagina para empezar
window.onload = function() {
    // Iniciamos el juego
    comenzarJuego();
    
    // Añadimos los event listeners a los botones de colores
    let botonesColores = document.querySelectorAll('.color-option');
    for(let boton of botonesColores) {
        boton.onclick = function() {
            // Cuando hacemos click, cogemos el segundo nombre de clase que es el color
            let color = boton.classList[1];
            seleccionarColor(color);
        }
    }

    
    let botonComprobar = document.querySelector('section button[type="button"]');
    botonComprobar.textContent = 'Comprobar combinación'; 
    botonComprobar.onclick = validaColoresUsuario;
}

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
    let historial = document.querySelector('.attempts-history'); // Corregido el error de typo en document
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
        let casillas = document.querySelectorAll('.current-guess .cell'); // Corregido el selector
        casillas[intentoActual.length - 1].className = 'cell ' + color;

        // Actualizamos el mensaje
        let mensaje = document.querySelector('[role="status"]'); // Corregido para seleccionar solo uno
        if (intentoActual.length === 4) {
            mensaje.textContent = 'Pulsa "Comprobar combinacion" para validar.';
        } else {
            mensaje.textContent = `Selecciona ${4 - intentoActual.length} colores mas.`;
        }
    }
}

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


// Funcion para agregar un intento al historial
function agregarIntentoAlHistorial(exactos, coloresCorrectos) {
    let historial = document.querySelector('.attempts-history');
    
    // Creamos nueva fila de intento
    let fila = document.createElement('li');
    fila.className = 'attempt-row';
    
    // Añadir colores del intento
    let contenedorColores = document.createElement('ul');
    contenedorColores.className = 'attempt-colors';
    
    // Añadimos cada color del intento
    for(let color of intentoActual) {
        let casilla = document.createElement('li');
        casilla.className = 'cell ' + color;
        contenedorColores.appendChild(casilla);
    }

    let contenedorPistas = document.createElement('ul');
    contenedorPistas.className = 'feedback';
    
    for(let i = 0; i < exactos; i++) {
        let pista = document.createElement('li');
        pista.className = 'feedback-peg';
        pista.style.backgroundColor = '#000';
        contenedorPistas.appendChild(pista);
    }
    
    for(let i = 0; i < coloresCorrectos; i++) {
        let pista = document.createElement('li');
        pista.className = 'feedback-peg';
        pista.style.backgroundColor = '#fff';
        contenedorPistas.appendChild(pista);
    }
    
    for(let i = 0; i < (4 - exactos - coloresCorrectos); i++) {
        let pista = document.createElement('li');
        pista.className = 'feedback-peg';
        contenedorPistas.appendChild(pista);
    }
    
    fila.appendChild(contenedorColores);
    fila.appendChild(contenedorPistas);
    
    historial.insertBefore(fila, historial.firstChild);
}


// Funcion para finalizar el juego cuando gana
function finalizarJuegoGanado() {
    mostrarCodigoSecreto();
    let mensaje = document.querySelector('[role="status"]');
    mensaje.textContent = '¡Felicidades! Has descubierto el código secreto.';
    agregarBotonNuevoJuego();
}

// Funcion para finalizar el juego cuando pierde
function finalizarJuegoPerdido() {
    mostrarCodigoSecreto();
    let mensaje = document.querySelector('[role="status"]');
    mensaje.textContent = 'Juego terminado. No has logrado descubrir el código secreto.';
    agregarBotonNuevoJuego();
}

// Funcion para mostrar el codigo secreto
function mostrarCodigoSecreto() {
    let casillas = document.querySelectorAll('.secret-code .cell');
    for(let i = 0; i < codigoSecreto.length; i++) {
        casillas[i].className = 'cell ' + codigoSecreto[i];
    }
}

// Funcion para agregar el botón de nuevo juego
function agregarBotonNuevoJuego() {
    let boton = document.createElement('button');
    boton.textContent = 'Nueva partida';
    boton.onclick = comenzarJuego;
    document.querySelector('section[aria-label="Información del juego"]').appendChild(boton);
}