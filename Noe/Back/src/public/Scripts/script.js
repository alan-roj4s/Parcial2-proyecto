// import { showScreen, startShopping } from "./inicio.js"
// import { filtrarProductos } from "./productos.js"


// ------------ ESCUCHADORES ------------
document.addEventListener('DOMContentLoaded', function() {
    
    const botonRedireccion = document.querySelector('#redirigirBtn')
    

    botonRedireccion.addEventListener('click', function() {
        redirigir();
    })})

// --------------------------------------



// ------- TODO FUE TRASLADADO A PRODUCTOS.JS, ESTE ARCHVO SOLO UTILIZA EL
// redirigir() AL FINAL DEL ARCHIVO




// --------------- REDIRECCION A LA PAGINA exclusiva de index.html

// function redirigir() {      // esta funcion agarra el nombre del input
//     const input = document.getElementById('customerName'); //linea 78 index.html
//     const nombre = input.value.trim(); //borra los espacios

//     if (nombre !== '') { //valida que el nombre no este vacio
//         window.location.href = './productos.html'; // redireccion a html
//     } else {
//         alert('Por favor ingresa tu nombre.');
//     }
// }

