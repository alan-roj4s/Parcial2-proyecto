import { inicializarProductos } from "./productos.js";
import { inicializarCarrito } from "./carrito.js";
import { inicializarLoginAdmin } from "./logAdmin.js";
import { inicializarAdminDashboard } from "./crearProducto.js"

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // PARA CARRITO
        if (document.getElementById("cartItems")){
            console.log('Inicializando carrito...');
            inicializarCarrito();
        }
        
        // PRODUCTOS
        console.log('Inicializando productos...');
        await inicializarProductos();

        // LOGIN DEL ADMIN
        if(document.getElementById('loginForm')){
            console.log('Inicializando login...');
            inicializarLoginAdmin();
        }

        // DASH DE CREAR PRODUCTO
        if (document.getElementById('admin-dashboard')) {
            console.log('Dashboard admin inicializado');
            inicializarAdminDashboard();
        }
        
        console.log('Inicializaciones exitosas');
    } catch (error) {
        console.error('Error al inicializar', error);
    }
});
