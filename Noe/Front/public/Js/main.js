import { inicializarProductos } from "./productos.js";
import { inicializarCarrito } from "./carrito.js";

document.addEventListener('DOMContentLoaded', async function() {
    try {
        inicializarCarrito();
        await inicializarProductos();
        console.log('Inicializacion exitosa');
    } catch (error) {
        console.error('Error al inicializar', error);
    }
});
