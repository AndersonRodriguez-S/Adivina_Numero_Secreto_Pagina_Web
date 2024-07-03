// Define Todas las condiciones iniciales del Juego
function condicionesIniciales(){
    //Asignamos el texto de elementos de HTML
    asignarTextoElemento('h1', "Adivina el número");
    asignarTextoElemento('.texto__parrafo', `Escoge un número del ${minimo} al ${maximo}`);
    numeroAleatorio = generarNumeroSecreto();
    intentos = 1;
    deshabilitarBotones(btnIntentar= false, btnReiniciar= true);
    return;
}


function asignarTextoElemento(elemento, contenido){
    document.querySelector(elemento).innerText = contenido;
    return;
}


function generarNumeroSecreto(){
    numeroGenerado = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;

    if (numerosAleatoriosGenerados.includes(numeroGenerado)){
        return generarNumeroSecreto();
    } else {
        numerosAleatoriosGenerados.push(numeroGenerado);
        return numeroGenerado;
    }
}


function verificarIntento(){
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (isNaN(numeroUsuario)){
        asignarTextoElemento('.texto__parrafo', `Escoge un número del ${minimo} al ${maximo}`);
        return;
    }
    if (numeroAleatorio === numeroUsuario){
        asignarTextoElemento('.texto__parrafo', `Acertaste el Número Secreto!: ${numeroAleatorio}\nTe Tomo ${intentos} ${intentos === 1 ? 'Intento' : 'Intentos'} Adivinarlo.`);
        deshabilitarBotones(btnIntentar= true, btnReiniciar= false);

        verificarLista();
    } else {
        if (numeroAleatorio > numeroUsuario){
            asignarTextoElemento('.texto__parrafo', 'El Número es Mayor');
        } else {
            asignarTextoElemento('.texto__parrafo', 'El Número es Menor');
        }
        intentos++;
        console.log(conteoIntentos);
        verificacionLimiteIntentos();
        conteoIntentos += 1;
        limpiarCampo('#valorUsuario');

    }
    return;
}


function limpiarCampo(elemento){
    document.querySelector(elemento).value = '';
    return;
}


function nuevoJuego(){
    condicionesIniciales();
    limpiarCampo('#valorUsuario');


}
function verificarLista(){
    if (numerosAleatoriosGenerados.length === (maximo - minimo) + 1){
        alert('Ganaste!, Adivinaste todos los numeros');
        asignarTextoElemento('.texto__parrafo', 'Ya adivinaste todos los numeros posibles');
        numerosAleatoriosGenerados = [];
        conteoIntentos = 1;        
    }
}


function deshabilitarBotones(btnIntentar = false, btnReiniciar = false){
    if (btnIntentar) {
        document.querySelector('#intentar').setAttribute("disabled", "");
    } else {
        document.querySelector('#intentar').removeAttribute("disabled");
    }

    if (btnReiniciar) {
        document.querySelector('#reiniciar').setAttribute("disabled", "");
    } else {
        document.querySelector('#reiniciar').removeAttribute("disabled");
    }
}


function verificacionLimiteIntentos(){
    if (isNaN(maxIntentos) || conteoIntentos < maxIntentos){
        return;
    } else {
        alert(`Perdiste, Has llegado al limite de ${maxIntentos} intentos fallidos`);
        asignarTextoElemento('.texto__parrafo', 'llegaste al limite de intentos');
        deshabilitarBotones(btnIntentar= true, btnReiniciar= false);
        conteoIntentos = 1;
        numerosAleatoriosGenerados = [];
    }
}


// Flujo Principal del Programa
let numeroAleatorio = 0;
let intentos = 0;
let conteoIntentos = 1;
let maxIntentos = NaN;
let minimo = 1;
let maximo = 10;
let numerosAleatoriosGenerados = [];
condicionesIniciales();




